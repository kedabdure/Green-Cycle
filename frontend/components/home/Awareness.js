import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

export default function TransformingScrap() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'auto',
        py: { xs: '50px', md: '100px' },
        px: { xs: '1rem', md: '2rem', lg: '5rem' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: -2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '50px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '2rem', md: "12px" },
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
            marginBottom: '40px',
            textAlign: "left",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              width: { xs: '100%', md: '60%' },
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              fontWeight: 700,
              lineHeight: "2.5rem"
            }}
          >
            Transforming Old and Discarded Furniture Items into Value
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
            gap: { xs: '20px', md: '20px' },
            justifyContent: 'space-between',
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
                position: "relative",
                width: "100%",
                height: { xs: "500px", md: "560px" },
                overflow: "hidden",
                borderRadius: "16px",
              }}
            >
              <Image
                src="/assets/images/before-and-after.jpg"
                fill
                alt="Big image"
                placeholder="blur"
                blurDataURL={'/assets/images/before-and-after.jpg'}
                style={{ objectFit: "cover" }}
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
                width: '100%',
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
                  src="/assets/images/furniture-garbage.jpg"
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
                  src="/assets/images/furniture-industry.jpg"
                  alt="featured"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                padding: { xs: "22px", md: "30px" },
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
                maxWidth: '130px',
                padding: '7px 4px 7px 10px',
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
              Buy Now
              <Image width={30} height={30} src="/assets/images/arrow-right.svg" alt="arrow" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
