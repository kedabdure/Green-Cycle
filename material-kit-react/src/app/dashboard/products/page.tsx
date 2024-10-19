"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsTable } from '@/components/dashboard/product/products-table';
import Link from 'next/link';
import { ScaleSpinner } from '@/components/loader/spinner';

const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
}

export default function ProductsPage(): React.JSX.Element {
  // Fetch products using React Query
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <ScaleSpinner />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          {/* Link wrapped around Button to avoid nesting */}
          <Link
            href={'/dashboard/products/new'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Add
            </Button>
          </Link>
        </div>
      </Stack>

      {/* Search filters */}
      <ProductsFilters />

      {/* Product table */}
      {products.length > 0 ? (
        <ProductsTable rows={products} />
      ) : (
        <Typography>No products available</Typography>
      )}
    </Stack>
  );
}
