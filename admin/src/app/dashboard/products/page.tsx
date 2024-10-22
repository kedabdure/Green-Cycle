"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsTable } from '@/components/dashboard/product/products-table';
import Link from 'next/link';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductProps } from '@/types/product';
import { ClipSpinner, ScaleSpinner } from '@/components/loader/spinner';

const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
}

export default function ProductsPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    document.title = 'Manage Products | Admin Dashboard';
  }, []);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) { return <ScaleSpinner />; }

  const filteredProducts = products.filter((product: ProductProps) => (
    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const exportToPDF = () => {
    const doc = new jsPDF();

    // DEFINE TABLE COLUMNS+
    const tableColumn = ["Title", "Price (ETB)", "Storage", "RAM", "SIM", "Color", "Created At"];
    const tableRows: string[][] = [];

    products.forEach((product: ProductProps) => {
      const productData = [
        product.title ?? '',
        product?.price?.toString() ?? '',
        product?.properties?.storage ?? '',
        product?.properties?.RAM ?? '',
        product?.properties?.SIM ?? '',
        product?.properties?.color ?? '',
        dayjs(product.createdAt).format('MMM D, YYYY'),
      ];
      tableRows.push(productData);
    });

    // ADD TABLE to the PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('products.pdf');
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" onClick={exportToPDF} startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
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
      <ProductsFilters onSearch={setSearchQuery} />
      {products.length && <ProductsTable rows={filteredProducts} isLoading={isLoading} />}
    </Stack>
  );
}
