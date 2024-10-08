import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Center from "../components/Center";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import Image from "next/image";
import Button from "../components/Button";
import { CircularProgress, Snackbar, Alert, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import userProfileImage from '../public/user-profile.webp';

const ProfileWrapper = styled.div`
  padding-top: 70px;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 40px 0 10px 0;
  font-weight: 600;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 90%; // Make it responsive
  max-width: 500px; // Set max-width
  display: flex;
  flex-direction: column; // Stack vertically
  align-items: center; // Center items
  gap: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row; // Change to row on larger screens
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.6rem 0;
  border: 1px solid #ddd;
  border-radius: 10px;

  &:disabled {
    background-color: #f3f3f3;
  }

  &:focus {
    border-color: #333;
    &::placeholder {
      color: #333;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 110px; // Set max width
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center; // Center the image and button
`;

const StyledForm = styled.form`
  flex-grow: 1;
  width: 100%; // Make form full width
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const StyledLabel = styled.label`
  display: inline-block;
  width: 100%;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #aaa;
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  background-color: #f1f1f1;
  color: #333;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledFileInput = styled.input`
  display: none;
`;

export default function Account() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState(session?.user?.image || "");
  const [saving, setSaving] = useState(false);
  const [snackbarState, setSnackbarState] = useState({ open: false, message: "", severity: "" });
  const [uploading, setUploading] = useState(false);

  const email = session?.user?.email;

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user?.name || "");
      setImageUrl(session?.user?.image || "");
    }
  }, [session, status]);

  if (status === "loading") return "Loading...";
  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await axios.put("/api/profile", { name: username, email, image: imageUrl });
      setSnackbarState({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbarState({
        open: true,
        message: `Error updating profile: ${error.message}`,
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleFileChange(ev) {
    const file = ev.target?.files[0];
    if (file) {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("email", email);

      try {
        const res = await axios.post("/api/imagekit", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { url } = res.data;

        setImageUrl(url);
        setSnackbarState({
          open: true,
          message: "Image uploaded successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Upload error:", error);
        setSnackbarState({
          open: true,
          message: `Upload failed: ${error.message}`,
          severity: "error",
        });
      } finally {
        setUploading(false);
      }
    }
  }

  const defaultBlurDataURL = "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IBYAAAAwAQCdASoEAAEAAkA4JYYAAA==";

  const handleCloseSnackbar = () => setSnackbarState({ open: false, message: "", severity: "" });

  return (
    <>
      <Header />
      <ProfileWrapper>
        <Center>
          <Title>Profile</Title>

          <Stack padding="1rem" spacing={2}>
            <Snackbar
              open={snackbarState.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
                sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                variant="filled"
                action={
                  <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                {snackbarState.message}
              </Alert>
            </Snackbar>
          </Stack>

          <Container>
            <ImageWrapper>
              <div>
                <StyledImage
                  src={imageUrl || userProfileImage}
                  width={100}
                  height={100}
                  alt="user-photo"
                  blurDataURL={defaultBlurDataURL}
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
              <StyledLabel>
                <StyledFileInput type="file" onChange={handleFileChange} />
                <StyledSpan disabled={uploading}>
                  {uploading ? <CircularProgress size={16} /> : "Edit Photo"}
                </StyledSpan>
              </StyledLabel>
            </ImageWrapper>

            <StyledForm onSubmit={handleSave}>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
              <Input type="email" name="email" placeholder="Email" value={email} disabled />
              <Button
                $primary
                type="submit"
                disabled={saving}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: 10,
                  fontSize: ".9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                }}
              >
                {saving && <CircularProgress size={16} style={{ marginRight: ".5rem", color: "#fff" }} />}
                Save
              </Button>
            </StyledForm>
          </Container>
        </Center>
      </ProfileWrapper>
      <Footer />
    </>
  );
}
