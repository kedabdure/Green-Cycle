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
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from "axios";

import userProfileImage from '../public/user-profile.webp';

const ProfileWrapper = styled.div`
  padding: 70px 0;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 30px 0 30px 0;
  font-weight: 600;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: normal;
    margin: 0 auto;
  }
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  margin: .1rem 0 .8rem 0;
  padding: 0.75rem;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  font-size: .95rem;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:disabled {
    background-color: #f3f3f3;
  }

  &:focus {
  // border-color: #344394;
  box-shadow: 0px 0px 0px 4px rgba(63, 81, 181, 0.15);
    &::placeholder {
      color: #333;
    }
  }
`;

const PhoneInputWrapper = styled(PhoneInput)`
  display: flex;
  width: 100%;
  height: 50px !important;
  margin: .1rem 0 .8rem 0;
  padding: 0.75rem;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  font-size: .95rem;
  transition: box-shadow 0.2s ease;

  &:disabled {
    background-color: #f3f3f3;
  }

  &:focus {
    border-color: #344394;
    box-shadow: 0px 0px 0px 4px rgba(63, 81, 181, 0.15);
  }
`;

const StyledInputLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 300;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: left;
  justify-content: flex-start;
`;

const StyledForm = styled.form`
  flex-grow: 1;
  width: 100%;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
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
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [snackbarState, setSnackbarState] = useState({ open: false, message: "", severity: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user?.name || "");
      setImageUrl(session?.user?.image || "");
      setEmail(session?.user?.email || "");

      axios.get("/api/profile")
        .then((res) => {
          const { phone, streetAddress, city, country, postalCode } = res.data;
          setPhone(phone);
          setStreetAddress(streetAddress);
          setCity(city);
          setCountry(country);
          setPostalCode(postalCode);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setSnackbarState({
            open: true,
            message: "Oops! Something went wrong while fetching your profile. Please try again later.",
            severity: "error",
          });
        });
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
      const res = await axios.put("/api/profile", { name: username, email, image: imageUrl, phone, streetAddress, city, country, postalCode });
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

          <Stack padding="0" marginTop="0" spacing={2}>
            <Snackbar
              open={snackbarState.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = userProfileImage;
                  }}

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
              {/* username */}
              <StyledInputLabel>Full name</StyledInputLabel>
              <Input
                type="text"
                name="username"
                value={username || ""}
                onChange={(ev) => setUsername(ev.target.value)}
                placeholder="Username"
              />

              {/* password */}
              <StyledInputLabel>Email</StyledInputLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email || ""}
                disabled
              />

              {/* phone */}
              <StyledInputLabel>Phone number</StyledInputLabel>
              <PhoneInputWrapper
                name="phone"
                placeholder="Enter phone number"
                defaultCountry="ET"
                international
                value={phone || ""}
                onChange={setPhone}
                countryCallingCodeEditable={false}
              />

              {/* street address */}
              <StyledInputLabel>Street address</StyledInputLabel>
              <Input
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={streetAddress || ""}
                onChange={(ev) => setStreetAddress(ev.target.value || "")}
              />

              <StyledInputLabel>City</StyledInputLabel>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={city || ""}
                onChange={(ev) => setCity(ev.target.value)}
              />

              <div style={{ display: 'flex', gap: '10px', margin: '0', padding: 0 }}>
                <div style={{ width: "60%" }}>
                  <StyledInputLabel>Country</StyledInputLabel>
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country || ""}
                    onChange={(ev) => setCountry(ev.target.value)}
                    style={{ marginTop: 0 }}
                  />
                </div>
                <div style={{ width: "40%" }}>
                  <StyledInputLabel>postalCode</StyledInputLabel>
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={postalCode || ""}
                    onChange={(ev) => setPostalCode(ev.target.value)}
                    style={{ marginTop: 0 }}
                  />
                </div>
              </div>

              <Button
                $primary
                type="submit"
                disabled={saving}
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  marginTop: "1rem",
                  borderRadius: 10,
                  fontSize: ".95rem",
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
