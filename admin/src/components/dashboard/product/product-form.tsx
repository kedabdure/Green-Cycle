"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CategoryProps } from "@/types/category";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import ImageUploader from "./ImageUploader";
import { ProductProps } from "@/types/product";

export default function ProductForm({
  _id,
  title: existingTitle,
  category: existingCategory,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  panoramicImages: existingPanoramicImage,
  properties: assignedProperties,
}: ProductProps) {
  const [title, setTitle] = useState(existingTitle || "");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState(existingCategory || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [productProperties, setProductProperties] = useState<Record<string, string>>(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || "");
  const [panoramicImages, setPanoramicImages] = useState<string[]>(existingPanoramicImage || [])
  const [images, setImages] = useState<string[]>(existingImages || []);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await axios.get("/api/categories");
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // SAVE PRODUCT TO DATABASE
  async function saveProduct(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsSaving(true);

    if (!title || !category || !price || !images.length) {
      Swal.fire({
        title: "Validation Error",
        text: `Please fill in all required fields:
          ${title ? '' : 'Product name,'}
          ${category ? '' : 'category,'}
          ${price ? '' : 'price,'}
          ${images ? '' : 'and at least one image,'}
        `,
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsSaving(false);
      return;
    }

    const data = {
      title,
      description,
      price,
      images,
      category,
      panoramicImages,
      properties: productProperties,
    };

    try {
      if (_id) {
        // EDITING EXISTING PRODUCT
        const res = await axios.put(`/api/products?id=${_id}`, data);
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Product updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          queryClient.invalidateQueries({ queryKey: ["products"] });
          router.push("/dashboard/products");
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to update product. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        // CREATING NEW PRODUCT
        const res = await axios.post("/api/products", data);
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Product created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          queryClient.invalidateQueries({ queryKey: ["products"] });
          router.push("/dashboard/products");
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to create product. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        };
      }
    } catch (error) {
      setIsSaving(false);
      const errorMessage =
        (error as any).response?.status === 500
          ? "Server error: Unable to save product."
          : (error as any).message === "Network Error"
            ? "Network error: Please check your internet connection."
            : "Something went wrong. Please try again.";

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSaving(false);
    }
  }

  // SET PRODUCT PROPERTY
  function setProductProp(propName: string, value: string) {
    setProductProperties((prev) => ({
      ...prev,
      [propName]: value,
    }));
  }

  // GET PROPERTIES TO FILL BASED ON SELECTED CATEGORY
  const propertiesToFill: { name: string; values: string[] }[] = [];
  if (categories.length && category) {
    let currentCategory = categories.find((cat) => cat._id === category);
    while (currentCategory) {
      propertiesToFill.push(...currentCategory.properties);
      currentCategory = currentCategory.parent;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      {/* PRODUCT NAME */}
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />

      {/* CATEGORY */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={categories.length > 0 ? category : ""}
          onChange={(ev) => setCategory(ev.target.value)}
          label="Category"
          required
        >
          <MenuItem value="">Uncategorized</MenuItem>
          {categories.length > 0 ? (categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))) : (
            <MenuItem disabled>Loading...</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* PRODUCT PROPERTIES */}
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((prop) => (
          <FormControl fullWidth margin="normal" key={prop.name}>
            <InputLabel>{prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}</InputLabel>
            <Select
              value={productProperties[prop.name] || ""}
              onChange={(ev) => setProductProp(prop.name, ev.target.value)}
              label={prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
            >
              {prop.values.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))
      }

      {/* PRODUCT PRICE */}
      <TextField
        label="Product Price (ETB)"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(ev) => {
          const value = parseFloat(ev.target.value);
          if (value >= 0 || ev.target.value === "") {
            setPrice(ev.target.value);
          }
        }}
        required
      />

      {/* PRODUCT DESCRIPTION */}
      <TextField
        label="Description *"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <Box sx={{ mt: 4 }}>
        <ImageUploader
          title="Product Photos *"
          directory="/ecommerce/products"
          images={images}
          setImages={setImages}
        />
      </Box>

      <Box sx={{ mt: 3, mb: 6 }}>
        <ImageUploader
          title="Panorama Images (optional)"
          directory="/ecommerce/panorama"
          images={panoramicImages}
          setImages={setPanoramicImages}
        />
      </Box>

      {/* SUBMIT / CANCEL BUTTONS */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSaving}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {isSaving ? (
            <CircularProgress size={24} color="inherit" />
          ) : _id ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/dashboard/products")}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
}
