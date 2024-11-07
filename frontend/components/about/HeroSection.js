import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "500px", md: "700px" },
        backgroundImage: 'url("/assets/images/about-banner-1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: { xs: '1rem', sm: '2rem' },
      }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      /> */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          color="#e1e2e2"
          variant="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem", lg: "4rem" },
            lineHeight: { xs: "1.2", md: "1.3" },
          }}
        >
          Elevating Businesses
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: "20px",
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem", lg: "1.25rem" },
            maxWidth: "600px",
            mx: "auto",
            color: "#e1e2e2",
          }}
        >
          As one of Ethiopia’s leading technology firms, we empower startups and established businesses alike with innovative solutions and exceptional design.
        </Typography>
        <Button
          component="a"
          href="#contact"
          sx={{
            textTransform: "capitalize",
            border: "1px solid #fb8122",
            fontWeight: "bold",
            mt: {xs: "2rem"},
            px: 3,
            py: 1,
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            backgroundColor: "#fb8122",
            color: "#fdfdfd",
            textDecoration: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#fb8122",
              borderColor: "#fb8122",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Work with us
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
