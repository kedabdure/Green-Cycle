import React, { useState } from "react";

import { Box, Typography, Button, Popover } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { MapPin } from "phosphor-react";

export default function Hero() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const goToProducts = () => {
    router.push("/products");
  };

  return (
    <Box
      sx={{
        padding: "0 20px",
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
      {/* Blob */}
      <Box
        sx={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          bottom: "2%",
          left: "-40%",
          zIndex: -1,
          background: "radial-gradient(circle, rgba(80, 227, 194, 0.4) 0%, rgba(80, 227, 194, 0) 70%)",
          backdropFilter: "blur(360px)",
        }}
      />

      {/* Pop over */}
      {/* <Button
        position="absolute"
        top="20px"
        left="20px"
        aria-describedby={id}
        variant="contained"
        sx={{
          textTransform: "none",
          width: "100%",
          maxWidth: "249px",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: 'flex-start',
          gap: "1rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', padding: '8px', background: '#E5E5FE', borderRadius: '50%' }}>
          <MapPin size={24} color="#5251FA" weight="fill" />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ textAlign: 'left', color: "#111", fontSize: '16px', fontWeight: "700" }}>Shipped</Typography>
          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: "400", color: "#555" }}>Track your order</Typography>
        </Box>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}

      <Box
        sx={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          top: "60%",
          right: "-40%",
          zIndex: -1,
          background: "radial-gradient(circle, rgba(80, 227, 194, 0.4) 0%, rgba(80, 227, 194, 0) 70%)",
          backdropFilter: "blur(360px)",
        }}
      />

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
            fontSize: { xs: "2.5rem", md: "3.5rem" },
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
              padding: "5px 20px",
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
            fontSize: { xs: "0.8rem", md: "1rem" },
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
            gap: "0.5rem",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            variant="transparent"
            sx={{
              maxWidth: "200px",
              padding: "0.55rem 2rem",
              fontSize: ".9rem",
              color: "#fff",
              fontWeight: "500",
              backgroundColor: "#111",
              border: "1px solid #111",
              borderRadius: "4px",
            }}
          >
            Sell
          </Button>
          <Button
            onClick={goToProducts}
            variant="outlined"
            sx={{
              maxWidth: "200px",
              padding: "0.55rem 2rem",
              fontSize: ".9rem",
              color: "#111",
              fontWeight: "500",
              borderColor: "#111",
              borderRadius: "4px",
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
            display: "flex",
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
    </Box>
  );
}
