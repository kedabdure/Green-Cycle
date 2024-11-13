import React from "react";
import Link from "next/link";
import { Box, Paper, Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function EmptyCartPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Paper
        elevation={6}
        sx={{
          textAlign: "center",
          padding: { xs: 3, md: 5 },
          borderRadius: "15px",
          maxWidth: 500,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mb={3}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 100,
              color: "grey.600",
              mb: 2,
            }}
          />
          <Typography variant="h4" color="text.primary" fontWeight="600">
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Looks like you haven’t added anything to your cart yet.
          </Typography>
        </Box>
        <Link href="/products" passHref legacyBehavior>
          <Button
            color="grey.600"
            size="large"
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: "25px",
              textTransform: "none",
              fontSize: "1rem",
              paddingX: 4,
              ":hover": {
                opacity: 0.9,
              },
            }}
          >
            Continue Shopping
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
