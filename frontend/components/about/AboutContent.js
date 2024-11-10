import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Lightbulb as LightbulbIcon } from 'phosphor-react';
import Image from "next/image";

const AboutContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        pt: { xs: '2rem', sm: '4rem', md: '8rem' },
        pb: { xs: '2rem', sm: '4rem', md: '12rem' },
        px: { xs: '1.5rem', sm: '3rem', md: '5rem' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: '2rem', md: '4rem' },
      }}
    >
      {/* Text Content */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h6" sx={{
          fontSize: { xs: '.7rem', sm: '.8rem', md: '1.2rem' },
          fontWeight: '600',
          color: '#2c8e41',
          mb: { xs: '0.5rem', md: '2rem' },
        }}>
          -- Who We Are
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.3rem' },
            fontWeight: 'bold',
            mb: { xs: '1rem', md: '1.5rem' },
            lineHeight: 1.3,
          }}
        >
          Repurposing Used furniture to Preserve Trees
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
            maxWidth: { md: '85%' },
            mb: { xs: '1.5rem', md: '2rem' },
          }}
        >
          At Green Cycle, we are dedicated to sustainability and the mission to reduce deforestation. Our passion lies in preserving trees and promoting eco-friendly practices through the reuse and renewal of wood.
          <br></br>
          <br></br>
          We carefully source quality wood and furniture from sustainable origins. Each piece is mended, refinished, and given new purpose, transforming it into a high-quality item ready for its next home. By choosing repurposed wood, our customers help cut down the demand for new resources.
          <br></br>
          <br></br>
          Every purchase from Green Cycle supports forest conservation. Together, we contribute to saving trees, reducing waste, and building a greener, more sustainable future.
        </Typography>

        <Button
          component="a"
          href="/contact"
          sx={{
            mt: { xs: '1rem', md: '1.05rem' },
            textTransform: "capitalize",
            border: "1px solid #34A853",
            fontWeight: "600",
            px: 4,
            py: 1.5,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            backgroundColor: "#34A853",
            color: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#2c8e41",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Let's Get Started
        </Button>
      </Box>

      {/* Image and Overlay Box */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: { xs: '100%', md: '50%' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '80%', md: '90%' },
            height: { xs: '300px', sm: '400px', md: '600px' },
            position: 'relative',
          }}
        >
          <Image
            src="/assets/images/about-image.jpg"
            alt="green cycle"
            fill
            sizes="100%"
            placeholder="blur"
            blurDataURL="/assets/images/green-cycle.jpg"
            style={{ borderRadius: '16px' }}
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '-20%',
              left: '-30%',
              width: { xs: '150px', sm: '180px', md: '300px' },
              height: { xs: '150px', sm: '180px', md: '250px' },
              backgroundColor: '#d9f8e5',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              color: '#333',
              textAlign: 'center',
              padding: '1rem',
              overflow: 'hidden',
            }}
          >
            <LightbulbIcon size={36} color="#fb8122" style={{ marginBottom: '1rem' }} /> {/* Phosphor Icon for visual appeal */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                color: '#2e2e2e',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem' },
                mb: '0.8rem',
              }}
            >
              Join the Green Movement
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#555',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                lineHeight: 1.4,
              }}
            >
              Help us preserve trees and build a sustainable future by supporting eco-friendly choices.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutContent;
