import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

  return (
    <Box
      sx={{
        padding: "0 10px",
        width: "100%",
        minHeight: "100vh",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        textAlign: "center",
        position: "relative",
        pt: "110px",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1090px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          position: 'relative',
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.8rem", md: "3rem", lg: '3.5rem' },
            color: "#111",
            maxWidth: "800px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "700",
            lineHeight: "1.2",
            textAlign: "center",
          }}
        >
          Sustain{" "}
          <Box
            component="span"
            sx={{
              padding: "5px 15px",
              borderRadius: "68px",
              backgroundColor: "#D7FFB1",
            }}
          >
            Green
          </Box>{" "}
          Furniture Rescue & Reuse
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.6rem", md: "1rem" },
            color: "#4f4f4f",
            marginBottom: "1rem",
            lineHeight: "1.6",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Support Ethiopia's Green Legacy by choosing pre-loved furniture. Together, we can reduce waste, conserve forests, and protect our environment.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "0.5rem", md: "1rem", lg: "1.5rem" },
            flexDirection: { xs: "row", md: "row" },
            zIndex: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/sell-furniture")}
            sx={{
              maxWidth: { xs: "180px", md: "200px", lg: "220px" },
              padding: { xs: "0.3rem 1rem", md: "0.55rem 2rem" },
              fontSize: { xs: "0.8rem", md: ".9rem" },
              color: "#fff",
              fontWeight: "500",
              backgroundColor: "#111",
              border: "1px solid #111",
              borderRadius: "4px",
              transition: "all .3s ease-in-out",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#111",
              },
            }}
          >
            Sell
          </Button>

          <Button
            onClick={() => router.push("/products")}
            variant="outlined"
            sx={{
              maxWidth: { xs: "180px", md: "200px", lg: "220px" },
              padding: { xs: "0.3rem 1rem", md: "0.55rem 2rem" },
              fontSize: { xs: "0.8rem", md: ".9rem" },
              color: "#111",
              fontWeight: "500",
              borderColor: "#111",
              borderRadius: "4px",
              transition: "all .3s ease-in-out",
              "&:hover": {
                backgroundColor: "#111",
                color: "#fff",
              },
            }}
          >
            Buy
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: "2rem",
            maxWidth: "800px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              bgcolor: '#fff',
              width: '256px',
              height: '204px',
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: 1,
            }}
          >
            <Image
              src={'/assets/images/abiy.jpg'}
              fill
              alt="Product photo"
              placeholder="blur"
              blurDataURL={'/assets/images/abiy.jpg'}
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              position: 'relative',
              bgcolor: '#fff',
              width: '256px',
              height: '204px',
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: 1,
            }}
          >
            <Image
              src={'/assets/images/forest.jpg'}
              fill
              alt="Product photo"
              placeholder="blur"
              blurDataURL={'/assets/images/forest.jpg'}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Small Images */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "auto",
            gap: "0px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "40%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {Array.from({ length: 2 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "60px",
                  height: "60px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Image
                  src="/assets/images/leaf.jpg"
                  width={68}
                  height={68}
                  alt={`Image ${index + 1}`}
                  placeholder="blur"
                  blurDataURL={'/assets/images/leaf.jpg'}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "80%",
              height: "60%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {Array.from({ length: 2 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "80px",
                  height: "80px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Image
                  src="/assets/images/greenLegacy1.jpg"
                  width={80}
                  height={80}
                  alt={`Image ${index + 1}`}
                  placeholder="blur"
                  blurDataURL={'/assets/images/greenLegacy1.jpg'}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Awareness */}
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: 'auto',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'transparent'
          }}
        >
          {/* <AwarenessSlider /> */}
        </Box>

      </Box>

      {/* Background SVG Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-67%', md: '-50%' },
          right: { xs: '0%', md: '-77%' },
          zIndex: -1,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src="/assets/images/greenGradient.svg"
          fill
          alt="Background SVG"
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
}
