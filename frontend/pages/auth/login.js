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
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { ArrowLeft as ArrowBackIcon } from 'phosphor-react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

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

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      window.location.href = "/";
    } else {
      setErrorMessages(res?.error);
      setOpen(true);
    }

    setLoginInProgress(false);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Log In - Auth - Green Cycle</title>
      </Head>
      <Box
        component="section"
        sx={{
          width: '100%',
          height: '100vh',
          padding: { xs: "1rem", md: "2rem" },
          backgroundImage: "url('/assets/backgrounds/pyramid.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          <ArrowBackIcon color="#fff" />
        </IconButton>


        {/* Notification */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
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
            {errorMessages}
          </Alert>
        </Snackbar>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            maxWidth: "330px",
            // mx: "auto",
            p: { xs: "1rem", md: "1.7rem 1.2rem 1rem 1.2rem" },
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
              fontSize: { xs: '2rem', md: '2rem' },
              fontWeight: '700',
            }}
          >
            Log In
          </Typography>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => {
              setEmail(ev.target.value);
              setEmailError("");
            }}
            error={!!emailError}
            helperText={emailError}
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError("");
            }}
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loginInProgress}
            sx={{ mt: 3, mb: 1, color: '#fff', backgroundColor: '#111' }}
          >
            {loginInProgress && (
              <CircularProgress size={17} sx={{ mr: 1 }} color="#fff" />
            )}
            Log In
          </Button>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ my: 1 }}>
            or login with
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
              Don&apos;t have an account?
              <Link href="/auth/register" passHref>
                <Button variant="text" color="primary" sx={{ fontSize: '.8rem', bgcolor: 'transparent', textTransform: 'none' }}>
                  Register here &raquo;
                </Button>
              </Link>
            </Typography>
          </Divider>
        </Box>
      </Box >
    </>
  );
}
