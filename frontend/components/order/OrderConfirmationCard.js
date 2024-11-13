import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { X, CheckCircle, Leaf } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OrderConfirmationCard() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999999,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            maxWidth: { xs: 330, md: 400 },
            width: '100%',
            height: 'auto',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000000,
            boxShadow: 3,
            p: { xs: '.2rem .6rem', md: '.5rem 1rem' },
            m: 'auto',
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.600' }}
          >
            <X size={24} />
          </IconButton>

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mt: { xs: 1 },
            }}
          >
            {/* Icons and Thank You Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: [0.5, 1.2, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: 0,
              }}
            >
              <CheckCircle size={95} color="#28a745" />
            </motion.div>

            <Typography variant="h5" sx={{ mt: { xs: ".2rem", md: 1 }, fontWeight: 'bold', maxWidth: '300px' }}>
              Thank You for Your Purchase!
            </Typography>
            <Leaf size={40} color="#28a745" />

            {/* Environmental Impact Message */}
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
                By choosing recycled materials, you’re helping to reduce waste and support a more sustainable future.
              </Typography>
            </Box>

            {/* Contribution Message */}
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Every purchase you make supports the use of reclaimed wood and upcycled materials, contributing to a healthier planet.
            </Typography>

            <Typography variant="body2" sx={{ mt: { xs: '.8rem' }, color: 'text.primary', fontWeight: '600' }}>
              Together, we’re making a difference!
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
