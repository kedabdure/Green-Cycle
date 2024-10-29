import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContext } from "../components/CartContext";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import OrderForm from "../components/OrderForm";
import Currency from "../components/Currency";
import Footer from "../components/Footer";
import EmptyCartPage from "../components/EmptyCartPage";
import Image from "next/image";
import { Plus as PlusIcon, Minus as XIcon, Trash as DeleteIcon } from "phosphor-react";
import router from "next/router";
import axios from 'axios';


export default function Cart() {
  const { cartProducts, addProduct, removeProduct, removeAllInstance } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function removeAllInstanceOfProduct(id) {
    removeAllInstance(id);
  }

  async function goToPayment(data) {
    const orderData = { ...data, cartProducts };
    try {
      const res = await axios.post('/api/checkout', orderData);
      if (res.data && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        console.error("No payment URL returned");
      }
    } catch (error) {
      console.error("Payment Initialization Failed:", error.message);
    }
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
    // goToPayment();
  }

  function handleContinueShopping() {
    router.push('/products');
  }

  return (
    <>
      <Header />
      <Box p={"5rem"}>
        {!cartProducts?.length && (
          <>
            <EmptyCartPage />
          </>
        )}
        {cartProducts?.length > 0 && (<Typography variant="h4" sx={{ fontSize: '34px', fontWeight: '700', m: '3rem 0' }}>Your Shopping</Typography>)}
        <Box>
          {cartProducts?.length > 0 && (
            <Typography variant="h4" color="#aaa" fontSize="20px" mb="3rem">
              Home/
              <Typography component="span" color="#111" display="inline-block" marginLeft="5px" fontSize="20px" variant="h4">
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
                                  color="#aaa"
                                  fontSize="10px"
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
                  maxWidth: '330px',
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
                  <Button size="large" sx={{ backgroundColor: '#111', color: '#fff', border: '1px solid #111', borderRadius: '33px', textTransform: 'capitalize', padding: '8px 16px', fontSize: "14px" }} onClick={handleCheckout}>
                    Go to Checkout
                  </Button>
                  <Button size="large" sx={{ backgroundColor: 'transparent', border: '1px solid #555', color: '#555', borderRadius: '33px', textTransform: 'capitalize', padding: '8px 16px', fontSize: "14px" }} onClick={handleContinueShopping}>
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
