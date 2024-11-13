import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import ClientSlider from "./QuoteSlider";

export default function Hero() {
  const router = useRouter();

  return (
    <Box sx={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      py: { xs: "90px", md: "120px" },
      px: { xs: "1rem", md: "2rem", lg: "5rem" },
      overFlow: "hidden",
      zIndex: 1,
    }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "2rem", md: "3rem" },
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "190px", md: "450px" },
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.4rem", md: "3.4rem", lg: "4.4rem" },
                color: "#111",
                maxWidth: { xs: "300px", sm: "400px", lg: "500px" },
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "900",
                lineHeight: { xs: "2.5rem", md: "4.3rem", lg: '5rem' },
              }}
            >
              Eco-Friendly Marketplace for Used Furniture
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.7rem", md: ".9rem" },
                color: "#4f4f4f",
                lineHeight: "1.6",
                maxWidth: { xs: "230px", md: "700px" },
                mb: { xs: "2rem", md: ".6rem" },
              }}
            >
              Support Ethiopia’s Green Legacy with sustainable furniture choices embrace eco-friendly materials and reduce waste with every purchase.
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: { xs: "center", md: "space-between" },
              gap: { xs: "0.5rem", md: ".5rem" },
              width: { xs: "100%", sm: "auto" },
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => router.push("/sell-furniture")}
              sx={{
                padding: { xs: "0.4rem 1.5rem", md: "0.72rem 2rem" },
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                color: "#fff",
                backgroundColor: "#111",
                border: "1px solid #111",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#111",
                },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Sell
            </Button>

            <Button
              variant="outlined"
              onClick={() => router.push("/products")}
              sx={{
                padding: { xs: "0.4rem 1.5rem", md: "0.7rem 1rem" },
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                color: "#111",
                borderColor: "#111",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#111",
                  color: "#fff",
                },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>

        {/* Right Section: Image Layout */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            maxWidth: '580px',
            display: "flex",
            flexDirection: "column",
            gap: { xs: ".9rem", md: "1rem" },
          }}
        >
          {/* Top Two Images */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: { xs: ".9rem", md: "1rem" }, }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "140px", md: "230px" },
                overflow: "hidden",
                borderRadius: "32px",
                boxShadow: 1,
              }}
            >
              <Image
                src={'/assets/images/hero-small1.jpg'}
                fill
                alt="Product photo 1"
                placeholder="blur"
                blurDataURL={'/assets/images/hero-small1.jpg'}
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "140px", md: "230px" },
                overflow: "hidden",
                borderRadius: "32px",
                boxShadow: 1,
              }}
            >
              <Image
                src={'/assets/images/hero-small2.jpg'}
                fill
                alt="Product photo 2"
                placeholder="blur"
                blurDataURL={'/assets/images/hero-small2.jpg'}
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Box>

          {/* Bottom Large Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "140px", md: "230px" },
              overflow: "hidden",
              borderRadius: "32px",
              boxShadow: 1,
            }}
          >
            <Image
              src={'/assets/images/hero-large.jpg'}
              fill
              alt="Product photo 3"
              placeholder="blur"
              blurDataURL={'/assets/images/hero-large.jpg'}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Button on Small Screen */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: {xs: "center", md: "space-between"},
            width: '80%',
            mt: 3,
            gap: 1,
          }}
        >
          <Button
            onClick={() => router.push("/sell-furniture")}
            sx={{
              padding: { xs: "0.6rem .5rem", md: "0.6rem 2rem" },
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#fff",
              backgroundColor: "#111",
              border: "1px solid #111",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#111",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Sell
          </Button>

          <Button
            variant="outlined"
            onClick={() => router.push("/products")}
            sx={{
              padding: { xs: "0.6rem .5rem", md: "0.6rem 2rem" },
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#111",
              borderColor: "#111",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#111",
                color: "#fff",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Quote Slider */}
      <Box sx={{
        width: '100%',
        position: 'absolute',
        bottom: { xs: '0', md: '0%' },
        left: 0,
      }}>
        <ClientSlider />
      </Box>
    </Box>
  );
}
