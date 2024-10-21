"use client";

import * as React from 'react';
import { Suspense, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { AdminsTable } from '@/components/dashboard/admin/admins-table';
import { ScaleSpinner } from '@/components/loader/spinner';
import { AdminsFilters } from '@/components/dashboard/admin/admins-filters';
import Link from 'next/link';
import AdminProps from '@/types/admin';

const fetchCustomers = async () => {
  const { data } = await axios.get('/api/admins');
  return data;
};

export default function Page(): React.JSX.Element {
  const { data: admins = [], isLoading, isError } = useQuery({
    queryKey: ['admins'],
    queryFn: fetchCustomers,
  });

  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const filteredAdmins = admins.filter((admin: AdminProps) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <Suspense fallback={<ScaleSpinner />}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Customers</Typography>
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
            <Link
              href={'/dashboard/admins/new'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
                Create Admin
              </Button>
            </Link>
          </div>
        </Stack>
        <AdminsFilters onSearch={setSearchQuery}/>
        <AdminsTable rows={filteredAdmins} isLoading={isLoading}/>
      </Stack>
    </Suspense>
  );
}
