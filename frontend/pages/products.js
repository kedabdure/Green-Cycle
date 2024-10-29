import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductsBox from "../components/product/ProductsBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Typography, Button, Grid } from "@mui/material";

// Fetch function
const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

export default function Products() {
  const { data: products = [], isLoading } = useQuery({
    productKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "130px 20px",
          minHeight: "100vh",
          backgroundColor: "#EEF2FB",
          overflow: "hidden",
          position: "relative",
          zIndex: '1',
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
          <Box sx={{ maxWidth: 756, marginBottom: 5 }}>
            <Typography variant="h4" fontWeight="600" gutterBottom sx={{ color: "#333" }}>
              Collection of Used Furniture
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.5 }}>
              Stay updated with our information and engaging blog posts about modern Furniture and Fashion in the industry.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 5 }}>
            {["All Furniture", "Bedroom", "Living Room", "Home Office", "Dining Table", "More"].map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  backgroundColor: index === 0 ? "#000" : "#e0e0e0",
                  color: index === 0 ? "#fff" : "#333",
                  ":hover": {
                    backgroundColor: "#333",
                    color: "#fff",
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          <Grid container spacing={3}>
            {products?.length > 0 &&
              products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <ProductsBox {...product} />
                </Grid>
              ))}
          </Grid>
        </Box>

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
