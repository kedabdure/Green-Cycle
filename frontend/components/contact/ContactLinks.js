import { Box, Typography } from '@mui/material';
import { TelegramLogo as TelegramIcon, TwitterLogo as XIcon, LinkedinLogo as LinkedinIcon } from 'phosphor-react';
import Image from 'next/image';

export default function ContactLinks() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: '1rem', md: '3rem', lg: '5rem' },
        pt: { xs: '90px', md: '110', lg: '130px' },
        pb: { xs: '2rem', md: '2rem', lg: '20px' },
        mb: 1,
        position: 'relative',
      }}
    >
      <Box sx={{
        maxWidth: { xs: '80%', 'md': '60%' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '.8rem', md: '2rem' },
      }}>
        <Typography variant='h6' sx={{ color: '#1c2229', fontSize: { xs: '12px', md: '16px' } }}>
          Contact Us
        </Typography>
        <Typography variant='h4' sx={{ color: '#1c2229', fontSize: { xs: '1.5rem', md: '3rem' }, fontWeight: 'bold' }}>Get In touch with us we are here to assist you.</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '.3rem', md: '1rem' },
        }}
      >
        <Box
          component={'a'}
          href={'http://t.me/kedabdure'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
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
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
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
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
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

      {/* Background SVG Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '27%', sm: '20%', md: '20%', lg: '2%' },
          left: { xs: '-30%', sm: '-20%', md: '-20%', lg: '-20%' },
          zIndex: -1,
          overflow: 'hidden',
          width: { xs: '200px', md: '300px', lg: '400px' },
          height: { xs: '200px', md: '300px', lg: '400px' },
        }}
      >
        <Image
          src="/assets/blobs/blob.svg"
          fill
          alt="Background SVG"
          priority
          style={{ objectFit: 'contained' }}
          placeholder='blur'
          blurDataURL='/assets/blobs/blob.svg'
        />
      </Box>
    </Box>
  )
}
