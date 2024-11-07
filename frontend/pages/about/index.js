import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AboutUs = () => {
  const router = useRouter()

  return (
    <>
      <Header />
      <Box component="section" id="about" sx={{ px: { xs: "4rem", md: "5rem" }, py: { xs: "90px", md: "120px" }, bgcolor: '#f4f4f4', width: '100%' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid container spacing={4} alignItems="center">
              {/* Left Content */}
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: { xs: "center", md: "left" }, px: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    letterSpacing={1.5}
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1.2rem' },
                      mb: 1,
                      color: 'var(--primary-color)',
                      textTransform: 'uppercase',
                    }}
                  >
                    About Us
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                      fontWeight: "bold",
                      color: "var(--secondary-color)",
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Redefining Sustainability
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      color: "var(--text-muted-color)",
                      mb: { xs: 4, md: 5 },
                      lineHeight: 1.6,
                    }}
                  >
                    Green Cycle is dedicated to giving second life to used furniture, reducing waste, and supporting our planet’s forests. We connect eco-conscious buyers with pre-loved furniture to reduce deforestation and global warming impacts, helping communities make sustainable choices. Every item we save from disposal brings us closer to a greener future.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{
                        textTransform: "uppercase",
                        border: "2px solid var(--primary-color)",
                        borderRadius: "20px",
                        fontWeight: "bold",
                        px: 4,
                        py: 1.5,
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        boxShadow: "0px 4px 10px rgba(0, 128, 0, 0.3)",
                        transition: "transform 0.3s ease, background-color 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                          color: "#fff",
                          transform: "scale(1.05)",
                          boxShadow: "0px 6px 15px rgba(34, 193, 195, 0.4)",
                        },
                      }}
                      onClick={() => router.push('/about')}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>


            {/* Right Image */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                  component="img"
                  src='/assets/images/about-image.jpg'
                  alt="Sustainable Furniture"
                  sx={{
                    width: { xs: "100%", sm: "80%", md: "100%" },
                    maxHeight: { xs: "auto", md: "550px" },
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
