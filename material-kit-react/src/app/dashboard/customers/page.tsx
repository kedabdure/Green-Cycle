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

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { ScaleSpinner } from '@/components/loader/spinner';

const fetchCustomers = async () => {
  const { data } = await axios.get('/api/customers');
  return data;
};

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: customers = [], isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to page 0 when changing rows per page
  };

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

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
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Add
            </Button>
          </div>
        </Stack>
        <CustomersFilters />
        <CustomersTable rows={customers}/>
      </Stack>
    </Suspense>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): any[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
