import { Box, Typography } from '@mui/material'

export default function ContactInfo() {
  return (
    < Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: { xs: '2rem', md: '2.5rem' },
        padding: { xs: '1rem', md: '2rem' },
        px: { xs: '1rem', md: '5rem' },
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/assets/images/contact-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }
      }
    >
      <Box sx={{ maxWidth: '400px' }}>
        <Typography variant="h6" sx={{ fontSize: '14px', mb: '1rem' }}>
          Contact Info
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.1rem',
            fontWeight: '700',
          }}
        >
          We are always happy to assist you
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: { xs: '1rem', md: '2rem' } }}>
        <Box sx={{ maxWidth: '350px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography
            variant="h4"
            sx={{
              mb: '.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                display: 'block',
                width: '10%',
                borderBottom: '3px solid #111',
                position: 'absolute',
                bottom: '-8px',
                borderRadius: '36px',
                left: 0,
              },
            }}
          >
            Email Address
          </Typography>

          <Typography variant='h4' sx={{ fontSize: '1.1rem', fontWeight: '700', }}>
            info@greencycle.com
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '.9rem', fontWeight: '400', lineHeight: '24px' }}>
            Assistance hours:
            Monday - Friday 6 am to 8 pm EST
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '350px', display: 'flex', alignItems: 'center', gap: { xs: '1rem', md: '1rem' } }}>
          <Box sx={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography
              variant="h4"
              sx={{
                mb: '.5rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '10%',
                  borderBottom: '3px solid #111',
                  position: 'absolute',
                  bottom: '-8px',
                  borderRadius: '36px',
                  left: 0,
                },
              }}
            >
              Number
            </Typography>
            <Typography variant='h4' sx={{ fontSize: '1.2rem', fontWeight: '700', }}>
              +251-953-431-572
            </Typography>
            <Typography variant='body2' sx={{ fontSize: '1rem', fontWeight: '400', lineHeight: '24px' }}>
              Assistance hours:
              Monday - Friday 6 am to 8 pm EST
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}