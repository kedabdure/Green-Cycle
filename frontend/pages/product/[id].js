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
import ProductsBox from "../../components/product/ProductsBox";
import Head from "next/head";
import Footer from '../../components/Footer';


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

  if (productLoading) {
    return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '4rem' }}>
      <CircularProgress color="#333" size={32} />
    </Box>
  }

  const handleAddToCart = () => {
    addProduct(product._id);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const slicedRelatedProducts = relatedProducts
    .filter((relatedProduct) => relatedProduct._id !== product._id)
    .slice(0, 5);

  if (productLoading) return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "5rem" }}><CircularProgress color="#333" size={32} /></Box>;
  if (productError || !product) return <Typography variant="h6" color="error">Failed to load product</Typography>;

  return (
    <>
      <Head>
        <title>Product - Green Cycle</title>
      </Head>
      <Header />
      <Box sx={{ px: { xs: "1rem", md: "3rem", lg: "5rem" }, py: { xs: "90px", md: "100px", lg: "150px" } }}>
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
              <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }}>{product.title}</Typography>
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

        {slicedRelatedProducts.length > 0 && (
          <Box sx={{ mt: 12 }}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, mb: { xs: "3rem", md: "3.5rem" }, fontWeight: "600" }} >You may also like this!</Typography>
            {relatedLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '2rem' }}><CircularProgress /></Box>
            ) : (
              <Grid container spacing={1}>
                {slicedRelatedProducts.map((product) => (
                  <Grid item xs={6} sm={4} md={4} lg={3} key={product._id}>
                    <ProductsBox {...product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}
