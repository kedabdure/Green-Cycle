"use client";

import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { ReactSortable } from "react-sortablejs";
import { CameraPlus as CameraPlusIcon } from "@phosphor-icons/react";
import { Trash as Delete } from "@phosphor-icons/react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import Image from "next/image";

export default function ProductForm() {
  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [productProperties, setProductProperties] = useState<Record<string, string>>({});
  const [price, setPrice] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }

  async function saveProduct(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // Validate required fields
    if (!title || !category || !price || !images.length) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields: Product name, category, price, and at least one image.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    try {
      await axios.post('/api/products', data);
      Swal.fire({
        title: 'Success',
        text: 'Product created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // router.push('/products');
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response && error.response.status === 500) {
        errorMessage = 'Server error: Unable to save product.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error: Please check your internet connection.';
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  // Product Images
  async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    if (files && files.length > 0) {
      setIsUploading(true);

      const data = new FormData();

      for (const file of Array.from(files)) {
        data.append('file', file);
      }
      try {
        const res = await axios.post('/api/productUpload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setImages((prev) => [...prev, res.data.url]);

      } catch (error) {
        console.error("Upload Error:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to upload images. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsUploading(false);
      }
    }
  }

  function updateImagesOrder(images: any[]) {
    setImages(images);
  }

  function removeImage(link: string) {
    setImages(images.filter(img => img !== link));
  }

  function setProductProp(propName: string, value: string) {
    setProductProperties((prev) => ({
      ...prev,
      [propName]: value,
    }));
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }: { _id: string }) => _id === category);
    if (catInfo) {
      propertiesToFill.push(...catInfo.properties);
      while (catInfo?.parent?._id) {
        const parentCat = categories.find(({ _id }: { _id: string }) => _id === catInfo.parent._id);
        propertiesToFill.push(...parentCat.properties);
        catInfo = parentCat;
      }
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <Typography variant="h6" gutterBottom>
        Product Form
      </Typography>

      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={ev => setCategory(ev.target.value)}
          label="Category"
        >
          <MenuItem value="">Uncategorized</MenuItem>
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Product Properties */}
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <FormControl fullWidth margin="normal" key={p.name}>
          <InputLabel>{p.name[0].toUpperCase() + p.name.substring(1)}</InputLabel>
          <Select
            value={productProperties[p.name]}
            onChange={ev => setProductProp(p.name, ev.target.value)}
            label={p.name[0].toUpperCase() + p.name.substring(1)}
          >
            {p.values.map((v: string) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      {/* Image Upload Section */}
      <Typography color="#666" sx={{ mt: '10px' }}>Photos</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: 1,
          mb: 2
        }}>
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
          {!!images?.length && images.map(link => (
            <Box key={link} sx={{ position: 'relative', width: 96, height: 96, margin: 1 }}>
              {/* Replace <div> with MUI's Paper component for better styling */}
              <Paper
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  padding: 1,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 1,
                  backgroundColor: 'white',
                }}
              >
                <img
                  src={link}
                  alt="Product Image"
                  style={{ width: '100%', height: '100%', borderRadius: 2 }}
                />
                {/* Remove Button */}
                <IconButton
                  onClick={() => removeImage(link)}
                  sx={{
                    position: 'absolute',
                    top: 1,
                    right: 1,
                    opacity: 0.8,
                    padding: ".2rem",
                    color: 'white',
                    backgroundColor: 'red',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': { opacity: 1, color: 'crimson' },
                  }}
                >
                  <Delete size={16} />
                </IconButton>
              </Paper>
            </Box>
          ))}
        </ReactSortable>

        {isUploading && (
          <Box sx={{ height: 96, width: 96, display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        <label>
          <Button
            variant="outlined"
            component="label"
            sx={{
              width: 96,
              height: 96,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CameraPlusIcon size={32} fontWeight='400' />
            <input
              type="file"
              hidden
              onChange={uploadImages}
            />
          </Button>
        </label>
      </Box>


      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />

      <TextField
        label="Price (in USD)"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-4"
        disabled={isUploading}
      >
        Save
      </Button>
    </form >
  );
}
