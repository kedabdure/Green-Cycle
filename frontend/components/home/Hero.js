import { Box, Typography, Button, autocompleteClasses } from "@mui/material";
import Image from "next/image";
import AwarenessSlider from "./AwarenessSlider";

export default function Hero() {
  return (
    <Box
      sx={{
        padding: "120px",
        width: "100%",
        minHeight: "100vh",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "901px",
          height: "597px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: "877px",
            height: "356px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "877px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "4rem",
                color: "#111",
                marginBottom: "1rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700",
                lineHeight: "1.2",
                textAlign: "center",
              }}
            >
              Efficient{" "}
              <Box
                component="span"
                sx={{
                  padding: "5px 20px",
                  borderRadius: "68px",
                  backgroundColor: "#D7FFB1",
                }}
              >
                Scrap
              </Box>{" "}
              Recycling Services Near You
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.9rem",
                color: "#4f4f4f",
                marginBottom: "2rem",
                lineHeight: "1.6",
                textAlign: "center",
                maxWidth: "700px",
              }}
            >
              Discover a sustainable way to furnish your home by buying and
              selling pre-loved furniture. When you choose to reuse, you're
              giving these pieces a second life and helping reduce waste. Let's
              make a positive impact on the environment together.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                maxWidth: "200px",
                width: "120px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                color: "#111",
                fontWeight: "500",
                backgroundColor: "#D7FFB1",
                border: "1px solid #111",
                borderRadius: "4px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Sell
            </Button>
            <Button
              variant="outlined"
              sx={{
                maxWidth: "200px",
                width: "120px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                color: "#111",
                fontWeight: "500",
                borderColor: "#111",
                borderRadius: "4px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#D7FFB1",
                },
              }}
            >
              Buy
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "2rem",
            maxWidth: "800px",
            color: "#333",
            width: "901px",
            height: "193px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              width: "252px",
              height: "202px",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <Image src="/assets/images/Dupe-sofa.jfif" width={252} height={204} alt="Dupe Sofa" />
          </Box>
          <Box
            sx={{
              width: "252px",
              height: "202px",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <Image src="/assets/images/traditional-style.jfif" width={252} height={204} alt="Traditional Style" />
          </Box>
        </Box>
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
            width: "1093px",
            height: "142px",
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
            <Box
              sx={{
                width: "60px",
                height: "60px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <Image src="/assets/images/forest1.jfif" width={68} height={68} alt="Forest" />
            </Box>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <Image src="/assets/images/chair1.jfif" width={68} height={68} alt="Chair" />
            </Box>
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
            <Box
              sx={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <Image src="/assets/images/greenHand.jfif" width={80} height={80} alt="Green Hand" />
            </Box>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <Image src="/assets/images/greenWorld.jfif" width={80} height={80} alt="Green World" />
            </Box>
          </Box>
        </Box>

        {/* Awareness */}
        <Box sx={{ position: "absolute", bottom: "0", left: "0", width: "100%", height: 'auto', display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
          {/* <AwarenessSlider /> */}
        </Box>
      </Box>
    </Box>
  );
}
