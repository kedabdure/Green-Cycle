import React, { useContext } from "react";
import { CartContext } from "@/components/cart/CartContext";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useMediaQuery } from "@mui/material";
import { Plus as PlusIcon, Minus as XIcon, Trash as DeleteIcon, Minus } from "phosphor-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (ids) => {
  if (!ids || ids.length === 0) return [];
  const { data } = await axios.post('/api/cart', { ids });
  return data;
}

export default function OrderPreview() {
  const { cartProducts, addProduct, removeProduct, removeAllInstance } = useContext(CartContext);
  
  const isMobile = useMediaQuery('(max-width: 600px)');
  console.log(isMobile);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(cartProducts),
    enabled: cartProducts.length > 0,
  });

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function removeAllInstanceOfProduct(id) {
    removeAllInstance(id);
  }

  // Calculate total and subtotal
  let total = 0;
  cartProducts.forEach((productID) => {
    const price = products.find((product) => product._id === productID)?.price || 0;
    total += price;
  });

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Stack
      spacing={12}
      sx={{
        width: "100%",
        maxWidth: "561.65px",
      }}>
      {products?.length > 0 && !isMobile && (
        <TableContainer component={Box} sx={{ display: {sm: 'none', md: 'block'}}}>
          <Table>
            <TableHead>
              <TableRow>
                {["Items", "Description", "Quantity", "Price"].map((header) => (
                  <TableCell key={header} align="center">
                    <Typography
                      variant="body1"
                      sx={{
                        width: '75px',
                        backgroundColor: "#DFEBF9",
                        borderRadius: "33px",
                        padding: "5px",
                        fontWeight: "400",
                        fontSize: ".8rem",
                        m: 0,
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
                <TableRow key={product._id}>
                  <TableCell sx={{ p: 0 }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: "150px",
                        height: "114.15px",
                        overflow: "hidden",
                        borderRadius: "16px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={product.images[0]}
                        alt="Product photo"
                        fill
                        sizes="(max-width: 600px) 100px, (min-width: 600px) 150px"
                        style={{ objectFit: "contain", transition: "transform 0.3s ease" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box maxWidth="165px" display="flex" alignItems="flex-start" flexDirection="column" gap=".6rem">
                      <Typography variant="body1" fontSize="15px" fontWeight="600">{product.title}</Typography>
                      <Typography
                        variant="body2"
                        color="#5E5D6C8F"
                        fontSize="8.94px"
                        fontWeight="700"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          WebkitLineClamp: 2,
                          lineClamp: 2,
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" gap={1}>
                      <IconButton sx={{ border: '1px solid #aaa' }} onClick={() => lessOfThisProduct(product._id)} color="primary">
                        <Minus size={14} />
                      </IconButton>
                      <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>{cartProducts.filter((id) => id === product._id).length}</Typography>
                      <IconButton sx={{ border: '1px solid #aaa' }} onClick={() => moreOfThisProduct(product._id)} color="primary">
                        <PlusIcon size={14} />
                      </IconButton>
                      <IconButton onClick={() => removeAllInstanceOfProduct(product._id)} color="error">
                        <DeleteIcon size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Typography variant="body1">
                      {formatPrice(cartProducts.filter((id) => id === product._id).length * product.price)} <span style={{ fontSize: '12px', fontWeight: '700' }}>ETB</span>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Summary */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "348px",
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" fontSize="28px" fontWeight="700">Total</Typography>
          <Typography variant="h5" fontSize="28px" fontWeight="700">
            {formatPrice(total)} <span style={{ fontSize: '18px', fontWeight: '700', color: '#444' }}>ETB</span>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">Subtotal</Typography>
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">
            {formatPrice(total)} <span style={{ fontSize: '14px', fontWeight: '700' }}>ETB</span>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">Delivery Fee</Typography>
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">
            Free
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">Tax</Typography>
          <Typography variant="h6" fontSize='16px' fontWeight="700" color="#aaa">
            --
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
