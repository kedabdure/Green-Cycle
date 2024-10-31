import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsBox from "../components/product/ProductsBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

// Fetch function for products
const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

// Fetch function for categories
const fetchCategories = async () => {
  const { data } = await axios.get("/api/categories");
  return data;
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Header />
      <Box
        sx={{
          p: "120px 20px",
          minHeight: "100vh",
          backgroundColor: "#EEF2FB",
          overflow: "hidden",
          position: "relative",
          zIndex: '1',
        }}
      >
        <Box sx={{ maxWidth: 1170, margin: "0 auto" }}>
          <Box sx={{ maxWidth: 756, marginBottom: 5 }}>
            <Typography variant="h4" fontWeight="600" gutterBottom sx={{ color: "#333" }}>
              Collection of Used Furniture
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.5 }}>
              Stay updated with our information and engaging blog posts about modern Furniture and Fashion in the industry.
            </Typography>
          </Box>

          {/* Category Filter Buttons */}
          <Box sx={{ maxWidth: "800px", display: "flex", flexWrap: "wrap", gap: 2, mb: 5 }}>
            <Button
              variant={!selectedCategory ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(null)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontSize: { xs: "0.9rem", md: "1rem" },
                backgroundColor: !selectedCategory ? "#000" : "#e0e0e0",
                color: !selectedCategory ? "#fff" : "#333",
                ":hover": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
            >
              All Furniture
            </Button>

            {categories.map((category) => (
              <Button
                key={category._id}
                variant={selectedCategory === category._id ? "contained" : "outlined"}
                onClick={() => setSelectedCategory(category._id)}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  backgroundColor: selectedCategory === category._id ? "#000" : "#e0e0e0",
                  color: selectedCategory === category._id ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: "#333",
                    color: "#fff",
                  },
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          {/* Products Grid */}
          <Grid container spacing={1}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={4} md={4} lg={3} key={product._id}>
                <ProductsBox {...product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Background Circles */}
        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            top: "1%",
            right: "-25%",
            zIndex: -1,
            background: "radial-gradient(circle, rgba(80, 227, 194, 0.4) 0%, rgba(80, 227, 194, 0) 70%)",
            backdropFilter: "blur(360px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            bottom: "2%",
            left: "-40%",
            zIndex: -1,
            background: "radial-gradient(circle, rgba(80, 227, 194, 0.4) 0%, rgba(80, 227, 194, 0) 70%)",
            backdropFilter: "blur(360px)",
          }}
        />
      </Box >
      <Footer />
    </>
  );
}
