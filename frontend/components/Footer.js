import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Divider, IconButton } from "@mui/material";
import Link from "next/link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";

export default function Contact() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#1c2229",
        color: "#e1e2e2",
        pt: { xs: 4, sm: 4 },
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Link href="/#home" passHref legacyBehavior>
              <a
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Image src="/main-logo-white.png" alt="Green Cycle Logo" width={160} height={50} />
              </a>
            </Link>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "white",
                fontSize: { xs: "0.5rem", sm: "0.6rem", md: ".7rem" },
                maxWidth: "200px",
              }}
            >
              Rescuing furniture to reduce waste and conserve trees for a sustainable future.
              Contact us to sell and buy used furniture.
            </Typography>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
              Company
            </Typography>
            <Link href="/" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  Home
                </Typography>
              </a>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  About Us
                </Typography>
              </a>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  Contact Us
                </Typography>
              </a>
            </Link>
            <Link href="/account" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  Account
                </Typography>
              </a>
            </Link>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
              Our Services
            </Typography>
            <Link href="/sell-furniture" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  Sell your used furniture
                </Typography>
              </a>
            </Link>
            <Link href="/products" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.875rem", sm: ".8rem" },
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#48cb66",
                    },
                  }}
                >
                  Buy renewed furniture
                </Typography>
              </a>
            </Link>
          </Grid>

          {/* Find Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
              Find Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                fontSize: { xs: "0.875rem", sm: ".8rem" },
              }}
            >
              <PhoneIcon sx={{ mr: 1, fontSize: "1rem", color: "#48cb66" }} />
              Phone: +251-953-431-572
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                fontSize: { xs: "0.875rem", sm: ".8rem" },
              }}
            >
              <EmailIcon sx={{ mr: 1, fontSize: "1rem", color: "#48cb66" }} />
              Email: greencycle@gmail.com
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                fontSize: { xs: "0.875rem", sm: ".8rem" },
              }}
            >
              <LocationOnIcon sx={{ mr: 1, fontSize: "1rem", color: "#48cb66" }} />
              Address: Addis Ababa, Ethiopia
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: "#b3ffbf" }} />

        <Box sx={{ display: "flex", justifyContent: { xs: "left", md: "center" }, alignItems: "center", py: 2 }}>
          <Typography variant="body2" sx={{ mb: "1rem", fontSize: { xs: "0.65rem", sm: "0.875rem", md: ".8rem" }, color: "#e1e2e2" }}>
            &copy; {getCurrentYear()} Green Cycle. All Rights Reserved. Powered by <Link href={'http://t.me/kedabdure'} style={{ color: "#48cb66" }} >Abdurehim</Link>
          </Typography>
        </Box>
      </Container>

      {/* Scroll to Top Button */}

      {showScrollToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 30 },
            right: { xs: 20, sm: 30 },
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000 !important",
            "&:hover": {
              bgcolor: "#48cb66",
              color: "#fff",
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}

    </Box>
  );
}
