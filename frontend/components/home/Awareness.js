import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

export default function TransformingScrap() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: '50px 20px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          marginTop: '80px',
          maxWidth: '1133px',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '50px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
            marginBottom: '20px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              width: { xs: '100%', md: '60%' },
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 600,
            }}
          >
            Transforming Discarded Items into Value
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: { xs: '100%', md: '40%' },
              padding: '5px',
              fontSize: { xs: '0.9rem', md: '0.8rem' },
              lineHeight: 1.5,
            }}
          >
            Don’t throw away your used materials! With Green Cycle, turn them into value by recycling locally. We're here to make it easy and rewarding to give new life to items you no longer need.
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: { xs: '20px', md: '24px' },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '460px' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                borderRadius: '16px',
              }}
            >
              <Image
                width={460}
                height={600}
                src="https://ik.imagekit.io/gfpycoip3/ecommerce/Furniture/b446cb91e44ffc679639f63320e04c4a%201.svg"
                alt="featured"
                style={{ borderRadius: '16px', objectFit: 'cover' }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', md: '655px' },
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            <Box
              sx={{
                width: '429px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '30px',
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                textAlign: 'left',
                '@media (max-width: 768px)': {
                  padding: '20px',
                },
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
                How We Make It?
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                Green Cycle promotes sustainable practices through innovative solutions that enhance resource efficiency and reduce waste.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '20px', md: '24px' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <Image
                  width={364}
                  height={250}
                  src="https://ik.imagekit.io/gfpycoip3/ecommerce/Furniture/3926834d92ba09828639ed4927bd7ea6%201%20(1).png"
                  alt="featured"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <Image
                  width={267}
                  height={150}
                  src="https://ik.imagekit.io/gfpycoip3/ecommerce/Furniture/3926834d92ba09828639ed4927bd7ea6%202%20(1).png"
                  alt="featured"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                padding: '30px',
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
                80% Material Reusability
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                Green Cycle's innovative approach enables up to 80% of used materials to be repurposed effectively, reducing waste and supporting sustainable practices in your community.
              </Typography>

            </Box>
            <Button
              variant="contained"
              sx={{
                width: '150px',
                height: '46px',
                fontSize: '.9rem',
                borderRadius: '5px',
                backgroundColor: '#111',
                textTransform: 'none',
                color: '#fff',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#333',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Learn More
              <Image width={32} height={32} src="/assets/images/arrow-right.svg" alt="arrow" />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '5%', md: '13%' },
            left: { xs: '20%', md: '4%' },
          }}
        >
          <Image src="/assets/images/curv-arrow.svg" width={1300} height={230.67} alt="Curved Arrow" />
        </Box>
      </Box>

    </Box>
  );
}
