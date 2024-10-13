import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsTable } from '@/components/dashboard/product/products-table';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export const metadata = { title: `Products | Dashboard | ${config.site.name}` };

export default async function Page(): Promise<React.JSX.Element> {
  await mongooseConnect();
  const products = await Product.find();
  const productsData = JSON.parse(JSON.stringify(products));

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
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ProductsFilters />
      <ProductsTable rows={productsData} />
    </Stack>
  );
}
