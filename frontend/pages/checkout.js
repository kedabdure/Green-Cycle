import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderForm from '@/components/order/OrderForm';
import { Box, Typography, Container, Stack, Paper, Radio, RadioGroup, FormControlLabel, styled } from '@mui/material';
import OrderPreview from '@/components/order/OrderPreview';
import { CartContext } from '@/components/cart/CartContext';
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
  const { cartProducts } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  async function goToPayment(data) {
    const orderData = { ...data, cartProducts };

    let res;
    try {
      if (paymentMethod === 'card') {
        res = await axios.post('/api/checkout', orderData);

        if (res.data && res.data.payment_url) {
          window.location.href = res.data.payment_url;
        } else {
          console.error("No payment URL returned");
        }
      } else {
        res = await axios.post('/api/orders', orderData);

        if (res.status === 201) {
          // window.location.href = "/success";
          console.log("Order created successfully");
        }
      }

    } catch (error) {
      console.error("Payment Initialization Failed:", error.message);
    }
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          minHeight: '100vh',
          py: '130px',
          position: 'relative',
        }}
      >

        {/* Blobs */}
        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            top: "-20%",
            right: "-40%",
            zIndex: -1,
            background: "radial-gradient(circle, rgba(0, 255, 123, 0.4) 0%, rgba(0, 255, 123, 0) 60%)", // Changed to greenish
            backdropFilter: "blur(360px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            bottom: "-8%",
            left: "-43%",
            zIndex: -1,
            background: "radial-gradient(circle, rgba(0, 255, 123, 0.4) 0%, rgba(0, 255, 123, 0) 60%)", // Changed to greenish
            backdropFilter: "blur(360px)",
          }}
        />

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
              <Typography component="span" sx={{ fontSize: '16px', fontWeight: '600', color: '#aaa' }}>
                Home
              </Typography>
              <Typography component="span" sx={{ fontSize: '16px', fontWeight: '600', color: '#aaa', mx: 1 }}>
                /
              </Typography>
              <Typography component="span" sx={{ fontSize: '16px', fontWeight: '600', color: '#aaa' }}>
                My Cart
              </Typography>
              <Typography component="span" sx={{ fontSize: '16px', fontWeight: '600', color: '#333', mx: 1 }}>
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
            <Box sx={{ mt: 6 }}>
              <OrderForm onFormSubmit={goToPayment} paymentMethod={paymentMethod} />
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: "561.65px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 5, fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center' }}>
              Order Preview
            </Typography>
            <Box>
              <OrderPreview />
            </Box>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
