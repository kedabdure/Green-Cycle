"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import Google from "../../components/icons/Google";
import axios from "axios";
import { IconButton, CircularProgress, Alert, Stack, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { set } from "mongoose";


// Styled Components
const Section = styled.section`
  margin-top: 2rem;
  padding: 1rem;
  @media screen and (min-width: 768px) {
    margin-top: 4rem;
    padding: 0 2rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin: .5rem auto 1rem auto;
`;

const Message = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: ${({ $error }) => ($error ? "red" : "green")};
`;

const Form = styled.form`
  display: block;
  max-width: 23rem;
  margin: 0 auto;
  padding: 1.5rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ $isInvalid }) => ($isInvalid ? "red" : "#ddd")};
  border-radius: 4px;
  &:disabled {
    background-color: #f3f3f3;
  }
  &::placeholder {
    color: ${({ $isInvalid }) => ($isInvalid ? "red" : "#aaa")};
  }
  &:focus {
    border-color: ${({ $isInvalid }) => ($isInvalid ? "red" : "#333")};
    &::placeholder {
      color: #333;
    }
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 1.5rem 0 1rem 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: .9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const SmallText = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: #666;
  font-size: 0.75rem;
`;

const ProviderButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0;
  font-size: .9rem;
  padding: .5em 0.75rem;
  background-color: #f1f1f1;
  color: #333;
  border: 1px solid #ddd;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  font-size: 0.75rem;

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #0056b3;
    }
  }
`;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [userCreated, setUserCreated] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    // Reset error messages before validation
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!name) {
      setNameError("Please enter your full name.");
      valid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      valid = false;
    }

    if (!valid) return;

    setCreatingUser(true);
    setUserCreated(false);

    try {
      const response = await axios.post("/api/register", { name, email, password });

      if (response.status === 201) {
        setUserCreated(true);
        setSuccessMessages(["User created successfully."]);
        window.location.href = "/auth/login"
        setOpen(true)
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const errorMessages = err.response?.data.message
        ? [err.response.data.message]
        : ["An error has occurred. Please try again later."];
      setErrorMessages(errorMessages);
      setUserCreated(false)
      setOpen(true);
    } finally {
      setCreatingUser(false);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Stack padding="1rem" spacing={2}>
        <Snackbar
          open={open && !userCreated}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: '1rem',
              padding: '0.4rem 1rem',
            }}
            variant="filled"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ marginLeft: 'auto', marginTop: '-0.25rem' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {errorMessages}
          </Alert>
        </Snackbar>
      </Stack>

      {/* Success */}
      <Stack padding="1rem" spacing={2}>
        <Snackbar
          open={open && userCreated}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: '1rem',
              padding: '0.4rem 1rem',
            }}
            variant="filled"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ marginLeft: 'auto', marginTop: '-0.25rem' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {successMessages}
          </Alert>
        </Snackbar>
      </Stack>


      <Section>
        {/* {userCreated && (
          <Message>
            User created.<br />
            Now you can{" "}
            <Link href="/auth/login" passHref>
              <button style={{ textDecoration: "underline", color: "green" }}>
                Login &raquo;
              </button>
            </Link>
          </Message>
        )} */}
        <Form onSubmit={handleFormSubmit}>
          <Title>Register</Title>
          <Input
            type="text"
            placeholder="Full name"
            value={name}
            disabled={creatingUser}
            onChange={(ev) => {
              setName(ev.target.value);
              setNameError("");
            }}
            $isInvalid={!!nameError}
            pattern=".*"
          />
          {nameError && <ErrorText>{nameError}</ErrorText>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => {
              setEmail(ev.target.value);
              setEmailError("");
            }}
            $isInvalid={!!emailError}
            pattern=".*"
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError("");
            }}
            $isInvalid={!!passwordError}
            pattern=".*"
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          <Button type="submit" disabled={creatingUser}>
            {creatingUser && <CircularProgress size={17} style={{ marginRight: "1rem", color: "white" }} />}
            Register
          </Button>
          <SmallText>or login with provider</SmallText>
          <ProviderButton type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <Google />
            Login with Google
          </ProviderButton>
          <Divider>
            Existing account?{" "}
            <Link href="/auth/login" passHref>
              <button style={{ textDecoration: "underline" }}>Login here &raquo;</button>
            </Link>
          </Divider>
        </Form>
      </Section>
    </>
  );
}
