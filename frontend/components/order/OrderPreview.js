import React, { useContext } from "react";
import { CartContext } from "../../components/cart/CartContext";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, useMediaQuery } from "@mui/material";
import { Plus as PlusIcon, Minus as XIcon, Trash as DeleteIcon, Minus } from "phosphor-react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageLoader from "../PageLoader";
import axios from "axios";
import { Router, useRouter } from "next/router";

const fetchProducts = async (ids) => {
  if (!ids || ids.length === 0) return [];
  const { data } = await axios.post('/api/cart', { ids });
  return data;
}

export default function OrderPreview() {
  const router = useRouter();
  const { cartProducts, addProduct, removeProduct, removeAllInstance } = useContext(CartContext);
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(cartProducts),
    enabled: cartProducts.length > 0,
  });

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '4rem' }}>
      <CircularProgress color="#333" size={32} />
    </Box>
  }

  function moreOfThisProduct(id) {
    addProduct(id);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  function removeAllInstanceOfProduct(id) {
    removeAllInstance(id);
    queryClient.invalidateQueries({ queryKey: ['products'] });
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
    <Box
      sx={{
        width: "100%",
        maxWidth: "561.65px",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 3 },
      }}>
      {products?.length > 0 && !isMobile && (
        <TableContainer component={Box} sx={{ display: { sm: 'none', md: 'block' } }}>
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
                  <TableCell sx={{ p: 1 }}>
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
          maxWidth: { xs: "100%", md: "348px" },
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontSize: { xs: "22px", md: "28px" } }} fontWeight="700">Total</Typography>
          <Typography variant="h5" sx={{ fontSize: { xs: "22px", md: "28px" } }} fontWeight="700">
            {formatPrice(total)} <span style={{ fontSize: '14px', fontWeight: '700', color: '#444' }}>ETB</span>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">Subtotal</Typography>
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">
            {formatPrice(total)} <span style={{ fontSize: '12px', fontWeight: '500' }}>ETB</span>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">Delivery Fee</Typography>
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">
            Free
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd">
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">Tax</Typography>
          <Typography variant="h6" fontSize='14px' fontWeight="500" color="#aaa">
            --
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
