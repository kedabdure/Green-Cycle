import { Box, Button, TextField, Typography } from '@mui/material';
import Map from '../map/MyMap';

export default function NewsLetter() {
  return (
    <>
      {/* Newsletter and Map */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: { xs: '1rem', md: '4rem' },
          px: { xs: '1rem', md: '5rem' },
          width: '100%',
          height: { xs: 'auto', md: '400px' },
          gap: '5rem',
          zIndex: -1,
        }}
      >
        <Box>
          <Box sx={{
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Typography variant='h1' sx={{
              fontSize: "1.6rem",
              fontWeight: "700",
            }}>
              Subscribe To our Newsletter
            </Typography>
            <Typography variant='body1' sx={{ fontSize: '1rem' }}>
              subscribe to our newsletter: stay informed about our company news and important updates
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '500px',
              mx: 'auto',
              mt: 4,
            }}
          >
            <TextField
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  height: '55px',
                  borderRadius: '16px 0 0 16px',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                py: 1.5,
                px: 3,
                height: '55px',
                backgroundColor: '#111',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                borderRadius: '0 16px 16px 0',
                textTransform: 'none',
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: '100%',
          }}
        >
          <Map />
        </Box>
      </Box>
    </>
  )
}
