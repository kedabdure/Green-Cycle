"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { JSONParser } from "formidable/parsers";

export default function ProductOptions({ params }: { params: { editId: string } }) {
  const { editId } = params;
  const [product, setProduct] = useState<any>({});

  // parse the product to object
  console.log(product.title);

  useEffect(() => {
     const getProduct = async () => {
      try {
        const res = await axios.get(`/api/products?id=${editId}`);
        if (res.status === 200) {
          setProduct(res.data);
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
      <h1>test</h1>
    </div>
  );
}
