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
        pt: { xs: '6rem', sm: '4rem', md: '8rem' },
        pb: { xs: '6rem', sm: '4rem', md: '12rem' },
        px: { xs: '1.5rem', sm: '3rem', md: '5rem' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: { xs: '2rem', md: '4rem' },
      }}
    >
      {/* Text Content */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, order: { xs: '2', md: '1' } }} >
        <Typography variant="h6" sx={{
          fontSize: { xs: '.7rem', sm: '.8rem', md: '1.2rem' },
          fontWeight: '600',
          color: '#2c8e41',
          mb: { xs: '1rem', md: '2rem' },
        }}>
          -- Who We Are --
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.35rem', sm: '2rem', md: '2.3rem' },
            fontWeight: 'bold',
            mb: { xs: '1.2rem', md: '1.5rem' },
            lineHeight: 1.3,
          }}
        >
          Repurposing Used Furniture to Preserve Trees
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
            px: { xs: 3, md: 4 },
            py: { xs: 1.2, md: 1.5 },
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
          Let's Talk
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
          width: '100%',
          maxWidth: { xs: '300px', sm: '400px', md: '500px' },
          order: { xs: '1', md: '2' },
          mb: { xs: '2rem', md: '0' },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%' },
            height: { xs: '350px', sm: '400px', md: '500px', lg: '550px' },
            position: 'relative',
          }}
        >
          <Image
            src="/assets/images/about-image.jpg"
            alt="Green Cycle"
            fill
            sizes="100%"
            placeholder="blur"
            blurDataURL="/assets/images/green-cycle.jpg"
            style={{ borderRadius: '16px' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: { xs: '-15%', md: "-20%" },
              left: { xs: '-6%', md: '-25%' },
              width: { xs: '150px', sm: '180px', md: '300px' },
              height: { xs: '140px', sm: '180px', md: '230px' },
              backgroundColor: '#d9f8e5',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              color: '#333',
              textAlign: 'center',
              padding: '1rem',
              overflow: 'hidden',
            }}
          >
            <LightbulbIcon size={32} color="#fb8122" style={{ marginBottom: { xs: '.5rem', md: '1rem' } }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: '700',
                color: '#2e2e2e',
                fontSize: { xs: '.7rem', sm: '1.2rem', md: '1.6rem' },
                mb: { xs: '.4rem', md: '0.8rem' },
              }}
            >
              Join the Green Movement
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#555',
                fontSize: { xs: '0.5rem', sm: '0.875rem' },
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
