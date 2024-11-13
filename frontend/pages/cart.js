import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../components/cart/CartContext";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
import EmptyCartPage from "../components/cart/EmptyCartPage";
import Image from "next/image";
import Head from 'next/head';
import { Plus as PlusIcon, Minus as XIcon, Trash as DeleteIcon } from "phosphor-react";
import router from "next/router";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchCartProducts = async (cartProducts) => {
  const { data } = await axios.post('/api/cart', { ids: cartProducts });
  return data;
}

export default function Cart() {
  const { cartProducts, addProduct, removeProduct, removeAllInstance } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const { data: fetchedProducts, isLoading } = useQuery({
    queryKey: ['cartProducts', cartProducts],
    queryFn: () => fetchCartProducts(cartProducts),
    enabled: !!cartProducts?.length,
  });

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  if (isLoading) {
    return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '4rem' }}>
      <CircularProgress color="#333" size={32} />
    </Box>
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function removeAllInstanceOfProduct(id) {
    removeAllInstance(id);
  }

  let total = 0;
  for (const productID of cartProducts) {
    const price = products.find(product => product._id === productID)?.price;
    total += price;
  }

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function handleCheckout() {
    router.push('/checkout');
  }

  function handleContinueShopping() {
    router.push('/products');
  }

  return (
    <>
      <Head>
        <title>Cart - Green Cycle</title>
      </Head>
      <Header />
      <Box sx={{ p: { xs: '5rem 1rem', md: '5rem' }, position: 'relative', overflow: 'hidden', minHeight: '100vh', }}>
        {!cartProducts?.length && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <EmptyCartPage />
          </Box>
        )}

        {/* Background SVG Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-67%', md: '-50%' },
            right: { xs: '0%', md: '-67%' },
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
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Background SVG Bottom Left */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            bottom: { xs: '-67%' },
            left: { xs: '10%' },
            zIndex: -1,
            overflow: 'hidden',
            width: '150%',
            height: '100%',
          }}
        >
          <Image
            src="/assets/images/greenGradient.svg"
            fill
            alt="Background SVG"
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {cartProducts?.length > 0 && (<Typography variant="h4" sx={{ fontSize: '34px', fontWeight: '700', m: '3rem 0' }}>Your Shopping</Typography>)}
        <Box>
          {cartProducts?.length > 0 && (
            <Typography variant="h4" color="#aaa" fontSize="16px" mb="3rem">
              Home /
              <Typography component="span" color="#111" display="inline-block" marginLeft="5px" fontSize="16px" fontWeight={500} variant="h4">
                My Shop
              </Typography>
            </Typography>
          )}

          {cartProducts?.length > 0 && (
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={'6rem'} mt={4} mb={4}>
              {products?.length > 0 && (
                <TableContainer component={Box} sx={{ boxShadow: 'none', border: 'none', maxWidth: '749px', width: '100%' }}>
                  <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                      <TableRow>
                        {['Items', 'Info', 'Quantity', 'Price'].map((header) => (
                          <TableCell
                            key={header}
                            align="center"
                            sx={{ border: 'none' }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                width: 80,
                                backgroundColor: '#DFEBF9',
                                borderRadius: '33px',
                                padding: '5px',
                                fontWeight: '400',
                                fontSize: { xs: '0.875rem', md: '.9rem' },
                              }}
                            >
                              {header}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <React.Fragment key={product._id}>
                          <TableRow sx={{ border: 'none' }}>
                            <TableCell sx={{ border: 'none' }}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  width: { xs: '100px', md: '180px' },
                                  height: { xs: '100px', md: '140px' },
                                  overflow: 'hidden',
                                  borderRadius: '16px',
                                  position: 'relative',
                                }}
                              >
                                <Image
                                  src={product.images[0]}
                                  alt="Product photo"
                                  fill
                                  sizes="(max-width: 600px) 100px, (min-width: 600px) 230px"
                                  placeholder="blur"
                                  blurDataURL={`${product.images[0]}?tr=w-10,h-10,bl`}
                                  style={{
                                    objectFit: 'contain',
                                    transition: 'transform 0.3s ease',
                                  }}
                                />
                              </Box>
                            </TableCell>

                            <TableCell sx={{ border: 'none' }}>
                              <Box maxWidth="165px" display="flex" alignItems="flex-start" flexDirection="column" gap="1rem">
                                <Typography variant="body1" fontWeight="600">
                                  {product.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="#555"
                                  fontSize="11px"
                                  fontWeight="400"
                                  sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    lineClamp: 2,
                                  }}
                                >
                                  {product.description}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                              <Box width="120px" display="flex" flexDirection="column" gap="5px">
                                <Box display="flex" justifyContent="flex-start">
                                  <IconButton onClick={() => removeAllInstanceOfProduct(product._id)} color="error">
                                    <DeleteIcon size={20} />
                                  </IconButton>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center" width="100%" gap={1}>
                                  <Button
                                    sx={{ border: '1px solid #aaa', padding: '10px', minWidth: "21px", height: "18px", color: '#aaa' }}
                                    onClick={() => lessOfThisProduct(product._id)}
                                  >
                                    <XIcon size={14} />
                                  </Button>
                                  <Typography sx={{ mx: '4px' }}>
                                    {cartProducts.filter((id) => id === product._id).length}
                                  </Typography>
                                  <Button
                                    sx={{ border: '1px solid #aaa', padding: '10px', minWidth: "21px", height: "18px", color: '#aaa' }}
                                    onClick={() => moreOfThisProduct(product._id)}
                                  >
                                    <PlusIcon size={14} />
                                  </Button>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                              <Typography variant="body1">
                                {formatPrice(cartProducts.filter((id) => id === product._id).length * product.price)} ETB
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <Box
                sx={{
                  maxWidth: { xs: '100%', md: '330px' },
                  width: '100%',
                  maxHeight: '349px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontSize="24px" fontWeight="700" mb={3}>
                      Order Summary
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mb={2} borderBottom="1px solid #ccc" >
                      <Typography variant="body1" color="#666">
                        Subtotal
                      </Typography>
                      <Typography variant="body1">
                        {formatPrice(total)} <Typography component="span" color="#666" fontWeight="600" fontSize="12px">ETB</Typography>
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2} borderBottom="1px solid #ccc">
                      <Typography variant="body1" color="#666">
                        Delivery Fee
                      </Typography>
                      <Typography variant="body1" color="#666">
                        Free
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2} borderBottom="1px solid #ccc">
                    <Typography variant="body1" color="#111" fontWeight="700" fontSize="18px">
                      Total
                    </Typography>
                    <Typography variant="body1" color="#111" fontWeight="700" fontSize="18px">
                      {formatPrice(total)} <Typography component="span" color="#666" fontWeight="600" fontSize="12px">ETB</Typography>
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
                  <Button size="large" sx={{ backgroundColor: '#111', color: '#fff', border: '1px solid #111', borderRadius: '33px', textTransform: 'capitalize', padding: '8px 16px', fontSize: "14px", fontWeight: '600' }} onClick={handleCheckout}>
                    Go to Checkout
                  </Button>
                  <Button size="large" sx={{ backgroundColor: 'transparent', border: '1px solid #555', color: '#555', borderRadius: '33px', textTransform: 'capitalize', padding: '8px 16px', fontSize: "15px", fontWeight: '600' }} onClick={handleContinueShopping}>
                    Continue Shopping
                  </Button>
                </Box>
              </Box>
            </Box >
          )
          }
        </Box>
      </Box >
      <Footer />
    </>
  );
}
