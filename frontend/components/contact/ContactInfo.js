import { Box, Typography } from '@mui/material'

export default function ContactInfo() {
  return (
    < Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        mt: { xs: '1rem', md: '2.5rem' },
        padding: { xs: '3rem 1rem', md: '2rem' },
        px: { xs: '1rem', md: '5rem' },
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/assets/images/contact-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }}
    >
      <Box sx={{ maxWidth: { xs: '240px', md: '400px' } }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '16px', md: '18px' }, mb: { xs: '1.1rem', md: '.5rem' } }}>
          Contact Info
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.5rem', md: '2.1rem' },
            fontWeight: '700',
            mb: { xs: '1.5rem', md: '0' }
          }}
        >
          We are always happy to assist you
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: { xs: '1.3rem', md: '2rem' } }}>
        <Box sx={{ maxWidth: '350px', padding: { xs: '0', md: '32px' }, display: 'flex', flexDirection: 'column', gap: { xs: '.5rem', md: '1rem' } }}>
          <Typography
            variant="h4"
            sx={{
              mb: '.5rem',
              fontSize: { xs: '1rem', md: '1.1rem' },
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

          <Typography variant='h4' sx={{ fontSize: { xs: '.95rem', md: '1.1rem' }, fontWeight: '700', }}>
            info@greencycle.com
          </Typography>
          <Typography variant='body2' sx={{ fontSize: { xs: '.8rem', md: '.9rem' }, fontWeight: '400', lineHeight: '24px' }}>
            Assistance hours:
            Monday - Friday 6 am to 8 pm EST
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '350px', display: 'flex', alignItems: 'center', gap: { xs: '1rem', md: '1rem' } }}>
          <Box sx={{ padding: { xs: '0', md: '32px' }, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: { xs: '.5rem', md: '1rem' } }}>
            <Typography
              variant="h4"
              sx={{
                mb: '.5rem',
                fontSize: { xs: '1rem', md: '1.1rem' },
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
            <Typography variant='h4' sx={{ fontSize: { xs: '.95rem', md: '1.1rem' }, fontWeight: '700', }}>
              +251953431572
            </Typography>
            <Typography variant='body2' sx={{ fontSize: { xs: '.8rem', md: '.9rem' }, fontWeight: '400', lineHeight: '24px' }}>
              Assistance hours:
              Monday - Friday 6 am to 8 pm EST
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}