"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Google from "../../components/icons/Google";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Head from "next/head";
import { ArrowLeft as ArrowBackIcon } from 'phosphor-react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerInProgress, setRegisterInProgress] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "error" });
  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    // Reset error messages before validation
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    setRegisterInProgress(true);

    try {
      const res = await axios.post('/api/register', { name, email, password });

      if (res.status === 201) {
        setNotification({ open: true, message: "Sign-up successful! Redirecting to home...", severity: "success" });

        setTimeout(async () => {
          const signInResponse = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (signInResponse?.ok) {
            router.push("/");
          } else {
            router.push("/auth/login");
          }
        }, 2000);
      } else {
        setNotification({ open: true, message: res.data.message || "An error occurred during sign-up.", severity: "error" });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Try again later!";
      setNotification({ open: true, message: errorMessage, severity: "error" });
    }

    setRegisterInProgress(false);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Head>
        <title>Sign Up - Auth - Green Cycle</title>
      </Head>
      <Box
        component="section"
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#f1f1f1',
          padding: { xs: "1rem", md: "2rem" },
          zIndex: -1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          href="/"
          sx={{ alignSelf: "flex-start", mb: 2, position: 'absolute', top: { xs: '3%', md: '5%' }, left: { xs: '3%', md: '5%' } }}
          aria-label="Back to home"
        >
          <ArrowBackIcon color="#111" />
        </IconButton>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              fontSize: "1rem",
              padding: "0.4rem 1rem",
            }}
            variant="filled"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ marginLeft: "auto", marginTop: "-0.25rem" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            maxWidth: "370px",
            p: { xs: "1.3rem 1rem .5rem 1rem", md: "1.7rem 1.2rem .6rem 1.2rem" },
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            boxShadow: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="textPrimary"
            sx={{
              fontSize: { xs: '1.8rem', md: '2rem' },
              fontWeight: '700',
              mb: { xs: '.8rem', md: '1rem' }
            }}
          >
            Sign Up
          </Typography>
          <TextField
            type="text"
            label="Full name"
            variant="outlined"
            size="small"
            fullWidth
            value={name}
            disabled={registerInProgress}
            onChange={(ev) => {
              setName(ev.target.value);
              setNameError("");
            }}
            error={!!nameError}
            helperText={nameError}
            margin="dense"
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            disabled={registerInProgress}
            onChange={(ev) => {
              setEmail(ev.target.value);
              setEmailError("");
            }}
            error={!!emailError}
            helperText={emailError}
            margin="dense"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            value={password}
            disabled={registerInProgress}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError("");
            }}
            error={!!passwordError}
            helperText={passwordError}
            margin="dense"
          />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            size="small"
            fullWidth
            value={confirmPassword}
            disabled={registerInProgress}
            onChange={(ev) => {
              setConfirmPassword(ev.target.value);
              setConfirmPasswordError("");
            }}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            margin="dense"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={registerInProgress}
            sx={{ mt: 3, mb: 1, color: '#fff', backgroundColor: '#111' }}
          >
            {registerInProgress && (
              <CircularProgress size={17} sx={{ mr: 1 }} color="#fff" />
            )}
            Sign Up
          </Button>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ my: 1 }}>
            or sign up with
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            startIcon={<Google />}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            sx={{
              color: "#333",
              backgroundColor: "#f1f1f1",
              borderColor: "#ddd",
              "&:hover": {
                backgroundColor: "#f3f3f3",
              },
            }}
          >
            Google
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary" fontSize='.8rem'>
              Already have an account?
              <Link href="/auth/login" passHref>
                <Button variant="text" color="primary" sx={{ fontSize: ".75rem", textDecoration: "underline" }}>
                  Log In
                </Button>
              </Link>
            </Typography>
          </Divider>
        </Box>
      </Box>
    </>
  );
}
