import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { CartContext } from "../../components/cart/CartContext";
import ProductDetail from "../../components/product/ProductDetail";
import CartIcon from "../../components/icons/CartIcon";
import Currency from "../../components/Currency";
import Header from "../../components/header/Header";
import { X as CloseIcon } from "phosphor-react";
import ProductsBox from "../../components/product/ProductsBox";
import Head from "next/head";
import Footer from "../../components/Footer";


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
  const [panoramicImage, setPanoramicImage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const {
    data: relatedProducts = [],
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["relatedProducts", product?.category],
    queryFn: () => fetchRelatedProducts(product?.category),
    enabled: !!product?.category,
  });

  useEffect(() => {
    if (product?.panoramicImages?.length) {
      const cleanImageUrl = product.panoramicImages[0].split("?")[0];
      setPanoramicImage(cleanImageUrl);
    } else {
      setPanoramicImage("");
    }
  }, [product?.panoramicImages]);


  if (productLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleAddToCart = () => {
    addProduct(product._id);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const slicedRelatedProducts = relatedProducts
    .filter((relatedProduct) => relatedProduct._id !== product?._id)
    .slice(0, 5);

  return (
    <>
      <Head>
        <title>{product?.title || "Product"} - Green Cycle</title>
      </Head>
      {!isExpanded && <Header />}
      <Box
        sx={{
          px: isExpanded ? 0 : { xs: "1rem", sm: "2.5rem", md: "4rem", lg: "5rem" },
          py: isExpanded ? 0 : { xs: "5rem", sm: "5rem", md: "8rem" },
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            action={
              <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon size={18} />
              </IconButton>
            }
          >
            Product added to cart!
          </Alert>
        </Snackbar>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={isExpanded ? 12 : 6}
            sx={{
              height: isExpanded ? "100vh" : "auto",
            }}
          >
            <ProductDetail
              images={product?.images || []}
              panoramicImage={panoramicImage}
              isExpanded={isExpanded}
              onExpandImage={setIsExpanded}
            />
          </Grid>

          {!isExpanded && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {product?.badge && <Chip label={product.badge} color="primary" />}
                <Typography variant="h5" fontWeight="bold">
                  {product?.title || "Untitled Product"}
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {product?.description || "No description available."}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={2}>
                <Typography variant="h5" fontWeight="600">
                  {product?.price?.toLocaleString() || "0"}
                </Typography>
                <Currency>ETB</Currency>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#111",
                  textTransform: "none",
                }}
                onClick={handleAddToCart}
                startIcon={<CartIcon />}
              >
                Add to Cart
              </Button>
            </Grid>
          )}
        </Grid>

        {slicedRelatedProducts.length > 0 && !isExpanded && (
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontSize: { xs: "1.5rem", md: "1.7rem" },
                fontWeight: "600",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              You may also like
            </Typography>
            {relatedLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {slicedRelatedProducts.map((relatedProduct) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={relatedProduct._id}>
                    <ProductsBox {...relatedProduct} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Box>
      {!isExpanded && <Footer />}
    </>
  );
}
