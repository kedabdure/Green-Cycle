"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { Customer } from '@/types/customer';

dayjs.extend(relativeTime);

const fetchCustomers = async () => {
  const { data } = await axios.get('/api/customers');
  return data;
};


export default function Page(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    document.title = 'Manage Customers | Admin Dashboard';
  }, []);

  const { data: customers = [], isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const filteredCustomers = customers.filter((customer: { name: string; email: string; }) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();

    // DEFINE TABLE COLUMNS+
    const tableColumn = ["Name", "Email", "Phone", "Status", "Registered At"];
    const tableRows: string[][] = [];

    customers.forEach((customer: Customer) => {
      const orderData = [
        customer.name,
        customer.email,
        customer.phone,
        customer.status,
        dayjs(customer.createdAt).format('MMM D, YYYY'),
      ];
      tableRows.push(orderData);
    });

    // ADD TABLE to the PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('customers.pdf');
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" onClick={exportToPDF} startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <CustomersFilters onSearch={setSearchQuery} />
      <CustomersTable rows={filteredCustomers} isLoading={isLoading} />
    </Stack>
  );
}
