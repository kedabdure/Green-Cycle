import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box, Typography, Button, Container, Stack, Paper, Divider, Checkbox, FormGroup, FormControlLabel, } from '@mui/material';

export default function Checkout() {
  return (
    <>
      <Header />
      <Container
        sx={{
          minHeight: '100vh',
          py: '130px',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Checkout
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={5}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Left Section */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '504px' } }}>
            <Typography variant="h5" sx={{ mb: 5, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <Typography component="span" sx={{ color: '#ccc' }}>
                Home
              </Typography>
              <Typography component="span" sx={{ color: '#aaa', mx: 1 }}>
                /
              </Typography>
              <Typography component="span" sx={{ color: '#aaa' }}>
                My Cart
              </Typography>
              <Typography component="span" sx={{ color: '#333', mx: 1 }}>
                /
              </Typography>
              <Typography component="span" sx={{ color: '#333' }}>
                Checkout
              </Typography>
            </Typography>

            {/*Payment Options */}
            <Box sx={{
              width: '100%',
              height: '100%',
              maxHeight: '180.51px'
            }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '24px', mb: 2 }}>
                  Select Your Payment Method
                </Typography>
                <Box>
                  <FormGroup>
                    {/* Card Payment Option */}
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Stack direction="column" spacing={1}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              alignItems: 'center',
                              mt: 1,
                              flexWrap: 'wrap',
                            }}
                          >
                            {/* Payment Logos */}
                            <Image
                              src="/assets/images/chapa.svg"
                              width={110}
                              height={48}
                              alt="Chapa"
                              style={{ objectFit: 'contain' }}
                            />
                            <Image
                              src="/assets/images/awash-bank.svg"
                              width={95}
                              height={48}
                              alt="CBE Birr"
                              style={{ objectFit: 'contain' }}
                            />
                            <Image
                              src="/assets/images/cbe-transparent.svg"
                              width={85}
                              height={48}
                              alt="Awash Bank"
                              style={{ objectFit: 'contain' }}
                            />
                            <Image
                              src="/assets/images/bank-byssinia.svg"
                              width={95}
                              height={48}
                              alt="Bank of Abyssinia"
                              style={{ objectFit: 'contain' }}
                            />
                          </Box>
                        </Stack>
                      }
                    />


                    {/* Cash on Delivery Option */}
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography variant="body1" sx={{fontWeight: '700', fontSize: '16px', color: '#555'}}>
                          Cash on Delivery
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Box>
              </Paper>
            </Box>

            {/* Payment Form */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Billing Information
              </Typography>
              {/* Add form fields here */}
            </Box>

            {/* Pay Button */}
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" fullWidth>
                Pay Now
              </Button>
            </Box>
          </Box>

          {/* Right Section - Cart Summary */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Order Summary
            </Typography>

            {/* Cart Items */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body1">Cart Item 1</Typography>
                  {/* Add item details */}
                </Box>
                <Box>
                  <Typography variant="body1">Cart Item 2</Typography>
                  {/* Add item details */}
                </Box>
                {/* Add more cart items as needed */}
              </Stack>
            </Paper>

            {/* Summary */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">$100.00</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">$10.00</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    $110.00
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
