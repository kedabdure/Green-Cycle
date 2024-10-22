"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "@/components/dashboard/product/product-form";
import { Typography } from "@mui/material";

export default function ProductOptions({ params }: { params: { editId: string } }) {
  const { editId } = params;
  const [productInfo, setProductInfo] = useState<any>(null);


  useEffect(() => {
    const getProduct = async () => {
      if (!editId) return;
      try {
        const res = await axios.get(`/api/products?id=${editId}`);
        if (res.status === 200) {
          setProductInfo(res.data);
        } else {
          console.error("Failed to fetch the product");
        }
      } catch (error) {
        console.error("An error occurred while fetching the product:", error);
      }
    };

    getProduct();
  }, [editId]);

  return (
    <div>
      <Typography variant="h4" mb="1rem">Edit Product</Typography>
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
    </div>
  );
}
