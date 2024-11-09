import { Box, Typography } from '@mui/material';
import { TelegramLogo as TelegramIcon, TwitterLogo as XIcon, LinkedinLogo as LinkedinIcon } from 'phosphor-react';


export default function ContactLinks() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: '1rem', md: '3rem', lg: '5rem' },
        pt: { xs: '1rem', md: '2rem', lg: '130px' },
        pb: { xs: '1rem', md: '2rem', lg: '20px' },
        mb: 1,
      }}
    >
      <Box sx={{
        maxWidth: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '1rem', md: '2rem' },
      }}>
        <Typography variant='h6' sx={{ color: '#1c2229', fontSize: '16px' }}>
          Get Started
        </Typography>
        <Typography variant='h4' sx={{ color: '#1c2229', fontSize: '2.5rem', fontWeight: 'bold' }}>Get In touch with us we are here to assist you.</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Box
          component={'a'}
          href={'http://t.me/kedabdure'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: '1px solid #666',
            borderRadius: '50%',
            transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              color: '#111',
              transform: 'scale(1.1)',
              borderColor: '#333',
            },
          }}
        >
          <TelegramIcon size={18} color="#1c2229" />
        </Box>
        <Box
          component={'a'}
          href={'http://t.me/kedabdure'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: '1px solid #666',
            borderRadius: '50%',
            transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              color: '#111',
              transform: 'scale(1.1)',
              borderColor: '#333',
            },
          }}
        >
          <LinkedinIcon size={18} color="#1c2229" />
        </Box>
        <Box
          component={'a'}
          href={'http://t.me/kedabdure'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: '1px solid #666',
            borderRadius: '50%',
            transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              color: '#111',
              transform: 'scale(1.1)',
              borderColor: '#333',
            },
          }}
        >
          <XIcon size={18} color="#1c2229" />
        </Box>
      </Box>
    </Box>
  )
}