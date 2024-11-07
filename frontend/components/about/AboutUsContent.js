import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";

const AboutUsContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f8fa",
        width: "100%",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          padding: "40px 20px",
          "@media (max-width: 600px)": {
            padding: "30px 15px",
          },
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {/* Text Section */}
          <Grid item xs={12}>
            <Box sx={{ mb: 4, textAlign: { xs: "center", md: "left", lg: "left" } }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                letterSpacing="1.5"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1.2rem' },
                  mb: '0.5rem',
                  color: 'var(--primary-color)',
                  textTransform: 'uppercase',
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: '800',
                  color: '#1c2229',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                Our Story
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" }, // Responsive font size
                lineHeight: 1.8,
                color: "#333",
                textAlign: "justify",
                marginBottom: "30px",
              }}
            >
              We are a team of passionate and experienced creative professionals
              dedicated to delivering high-quality software and design solutions.
              With a focus on website and mobile application development, we pride
              ourselves on our ability to craft tailored digital experiences that
              not only meet but exceed our clients' expectations.
              <br />
              <br />
              Our mission is to empower businesses through innovative technology
              and exceptional design, transforming ideas into impactful and
              functional realities. We understand that every project is unique,
              and we approach each one with a commitment to excellence, ensuring
              that our solutions are both cutting-edge and user-centric.
              <br />
              <br />
              From concept to launch, our team works collaboratively with clients
              to create websites and mobile apps that are not only visually
              stunning but also highly functional and responsive. We leverage the
              latest technologies and industry best practices to ensure that our
              solutions are scalable, secure, and optimized for performance.
              <br />
              <br />
              At the heart of our work is a dedication to quality and a relentless
              pursuit of perfection. Whether you're looking to establish a strong
              online presence, develop a mobile application that engages users, or
              design a brand that resonates, we are here to help you achieve your
              goals.
              <br />
              <br />
              We believe in building long-lasting relationships with our clients,
              and our success is measured by the success of those we serve. Let us
              partner with you to bring your vision to life and drive your
              business forward in today's digital landscape.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsContent;
