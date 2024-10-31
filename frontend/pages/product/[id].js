import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Typography, Button, Chip, Stack, Snackbar, Alert, IconButton, Grid, CircularProgress } from "@mui/material";
import { CartContext } from "../../components/cart/CartContext";
import ProductDetail from "../../components/product/ProductDetail";
import CartIcon from "../../components/icons/CartIcon";
import Currency from "../../components/Currency";
import Header from "../../components/Header";
import { X as CloseIcon } from "phosphor-react";
import ProductsBox from "@/components/product/ProductsBox";


const fetchProduct = async (id) => {
  const { data } = await axios.get(`/api/products?id=${id}`);
  return data;
};

const fetchRelatedProducts = async (category) => {
  const { data } = await axios.get(`/api/products?category=${category}`);
  return data;
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addProduct } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const { data: product, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const { data: relatedProducts = [], isLoading: relatedLoading, error: relatedError } = useQuery({
    queryKey: ['relatedProducts', product?.category],
    queryFn: () => fetchRelatedProducts(product?.category),
    enabled: !!product?.category,
  });

  const handleAddToCart = () => {
    addProduct(product._id);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const slicedRelatedProducts = relatedProducts.slice(0, 4);

  if (productLoading) return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "5rem" }}><CircularProgress color="#333" size={32} /></Box>;
  if (productError || !product) return <Typography variant="h6" color="error">Failed to load product</Typography>;

  return (
    <>
      <Header />
      <Box sx={{ px: 4, py: "150px" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
          <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon size={18} />
            </IconButton>
          }>
            Product added to cart!
          </Alert>
        </Snackbar>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductDetail images={product.images || []} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              {product.badge && <Chip label={product.badge} color="primary" />}
              <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">{product.description}</Typography>
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Typography variant="h5" fontWeight="600">{product.price.toLocaleString()}</Typography>
              <Currency>ETB</Currency>
            </Box>
            <Button variant="contained" sx={{ maxWidth: '120px', backgroundColor: "#111", textTransform: 'none', fontSize: '.95rem' }} onClick={handleAddToCart} startIcon={<CartIcon />}>
              Add to Cart
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 12 }}>
          <Typography variant="h4" fontSize={'1.8rem'} mb={2} fontWeight="600">Related Products</Typography>
          {relatedLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>

          ) : (
            <Grid container spacing={1}>
              {slicedRelatedProducts.map((product) => (
                <Grid item xs={12} sm={4} md={4} lg={3} key={product._id}>
                  <ProductsBox {...product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}
