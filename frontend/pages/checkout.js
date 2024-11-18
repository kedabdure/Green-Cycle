import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import OrderForm from '../components/order/OrderForm';
import { Box, Typography, Stack, Paper, Radio, RadioGroup, FormControlLabel, styled, Alert, Snackbar } from '@mui/material';
import OrderPreview from '../components/order/OrderPreview';
import { CartContext } from '../components/cart/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: '#666',
  '&.Mui-checked': {
    color: '#333',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 30,
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    transition: 'background-color 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    backgroundColor: '#e0e0e0',
  },
}));

export default function Checkout() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { data: session } = useSession();


  function showError(message) {
    setErrorMessage(message);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  async function goToPayment(data) {
    if (!session) {
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    const orderData = { ...data, cartProducts, userId: session.user.id, paymentMethod };

    let res;
    try {
      if (paymentMethod === 'card') {
        res = await axios.post('/api/checkout', orderData);

        if (res.data && res.data.payment_url) {
          clearCart();
          window.location.href = res.data.payment_url;
        } else {
          showError("There was an issue with your payment setup. Please try again later.");
        }
      } else {
        res = await axios.post('/api/checkout', orderData);

        if (res.status === 201) {
          clearCart();
          window.location.href = res.data.returnUrl;
        } else {
          showError("Order not sent successfully!. Please try again.");
        }
      }

    } catch (error) {
      console.error("Payment Initialization Failed:", error.message);
      showError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <>
      <Head>
        <title>Checkout - Green Cycle</title>
      </Head>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          pt: '130px',
          pb: '60px',
          px: { xs: '1rem', md: '3rem', lg: '5rem' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Snackbar to display error message */}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="error"
            onClose={handleClose}
            sx={{
              width: '100%',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: 3,
              backgroundColor: '#ff3b3b',
              color: '#fff',
              fontWeight: '400',
              fontSize: '16px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        {/* Background SVG Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-67%', md: '-50%' },
            right: { xs: '0%', md: '-70%' },
            zIndex: -1,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src="/assets/images/greenGradient.svg"
            fill
            sizes="100%"
            alt="Background SVG"
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Background SVG Bottom Left */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            bottom: { xs: '-67%' },
            left: { xs: '0%' },
            zIndex: -1,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src="/assets/images/greenGradient.svg"
            fill
            alt="Background SVG"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 3, fontSize: '32px', fontWeight: '700' }}>
          Checkout
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ sm: 3, md: 4, lg: 12 }}
          sx={{
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {/* Left Section */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '504px' } }}>
            <Typography variant="h5" sx={{ mb: 5, fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center' }}>
              <Typography component="span" sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', color: '#aaa' }}>
                Home
              </Typography>
              <Typography component="span" sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', color: '#aaa', mx: ".2rem" }}>
                /
              </Typography>
              <Typography component="span" sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', color: '#aaa' }}>
                My Cart
              </Typography>
              <Typography component="span" sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', color: '#333', mx: ".2rem" }}>
                /
              </Typography>
              <Typography component="span" sx={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                Checkout
              </Typography>
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: '700', fontSize: { xs: '18px', sm: '22px', md: '24px' }, mb: 2 }}>
                  Select Your Payment Method
                </Typography>
                <Box>
                  <RadioGroup value={paymentMethod} onChange={handleChange}>
                    <FormControlLabel
                      value="card"
                      control={<CustomRadio />}
                      label={
                        <Stack direction="column" spacing={1}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: { xs: '5px', sm: '10px' },
                              alignItems: 'center',
                              mt: 1,
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}
                          >
                            {/* Responsive Payment Logos */}
                            <Image
                              src="/assets/images/chapa.svg"
                              width={80}
                              height={40}
                              alt="Chapa"
                              style={{ objectFit: 'contain' }}
                              sizes="(max-width: 600px) 70px, (max-width: 960px) 90px, 110px"
                            />
                            <Image
                              src="/assets/images/cbe-transparent.svg"
                              width={50}
                              height={35}
                              alt="cbe"
                              style={{ objectFit: 'contain' }}
                              sizes="(max-width: 600px) 40px, (max-width: 960px) 60px, 85px"
                            />
                            <Image
                              src="/assets/images/awash-bank.svg"
                              width={70}
                              height={40}
                              alt="awash"
                              style={{ objectFit: 'contain' }}
                              sizes="(max-width: 600px) 60px, (max-width: 960px) 90px, 95px"
                            />
                            <Box
                              sx={{
                                display: { xs: 'none', lg: 'flex' },
                                alignItems: 'center',
                              }}
                            >
                              <Image
                                src="/assets/images/bank-byssinia.svg"
                                width={95}
                                height={40}
                                alt="Bank of Abyssinia"
                                sizes="(max-width: 600px) 60px, (max-width: 960px) 80px, 95px"
                                style={{ objectFit: 'contain' }}
                              />
                            </Box>
                          </Box>
                        </Stack>
                      }
                    />
                    <FormControlLabel
                      value="cash"
                      control={<CustomRadio />}
                      label={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: '700',
                            fontSize: '16px',
                            color: '#555',
                          }}
                        >
                          Cash on Delivery
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Box>
              </Paper>
            </Box>

            {/* order preview */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                flex: 1,
                width: "100%",
                maxWidth: "561.65px",
              }}
            >
              <Typography variant="h5" sx={{ mb: { xs: '1.3rem', md: "2rem" }, mt: { xs: 4, md: 0 }, fontSize: { xs: '18px', md: '18px' }, fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                Order Preview
              </Typography>
              <Box>
                <OrderPreview />
              </Box>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" sx={{ mb: { xs: '1.3rem', md: "2rem" }, mt: { xs: 4, md: 0 }, fontSize: { xs: '18px', md: '18px' }, fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                Payment Info
              </Typography>
              <OrderForm onFormSubmit={goToPayment} paymentMethod={paymentMethod} />
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              flex: 1,
              width: "100%",
              maxWidth: "561.65px",
            }}
          >
            <Typography variant="h5" sx={{ mb: { xs: '1.3rem', md: "2rem" }, mt: { xs: 4, md: 0 }, fontSize: { xs: '18px', md: '18px' }, fontWeight: '700', display: 'flex', alignItems: 'center' }}>
              Order Preview
            </Typography>
            <Box>
              <OrderPreview />
            </Box>
          </Box>
        </Stack>
      </Box>
      <Footer />
    </>
  );
}
