"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import Google from "../../components/icons/Google";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Head from "next/head";


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
  max-width: 22rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  margin: 2rem 0 1rem 0;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: .9rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [open, setOpen] = useState(false);


  async function handleFormSubmit(ev) {
    ev.preventDefault();

    // Reset error messages before validation
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      valid = false;
    }

    if (!valid) return;

    setLoginInProgress(true);
    setError(false);
    setUserCreated(false);

    const res = await signIn('credentials',
      {
        email,
        password,
        redirect: false
      });

    if (res?.ok) {
      window.location.href = '/';
    } else {
      setErrorMessages(res?.error);
      setOpen(true);
    }

    setLoginInProgress(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Log In - Auth - Green Cycle</title>
      </Head>
      <Stack padding="1rem" spacing={2}>
        <Snackbar
          open={open}
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
      <Section>
        {userCreated && (
          <Message>
            User created.<br />
            Now you can{" "}
            <Link href="/login" passHref>
              <button style={{ textDecoration: "underline", color: "green" }}>
                Log In &raquo;
              </button>
            </Link>
          </Message>
        )}
        {error && (
          <Message $error>
            An error has occurred.<br />
            Please try again later.
          </Message>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Title>Log In</Title>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled={loginInProgress}
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
            name="password"
            placeholder="Password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError("");
            }}
            $isInvalid={!!passwordError}
            pattern=".*"
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          <Button type="submit" disabled={loginInProgress}>
            {loginInProgress && <CircularProgress size={17} style={{ marginRight: "1rem" }} />}
            Log In
          </Button>
          <SmallText>or login with provider</SmallText>
          <ProviderButton type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <Google />
            Google
          </ProviderButton>
          <Divider>
            Don't have an account?{" "}
            <Link href="/auth/register" passHref>
              <button style={{ textDecoration: "underline" }}>register here &raquo;</button>
            </Link>
          </Divider>
        </Form>
      </Section>
    </>
  );
}
