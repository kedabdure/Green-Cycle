'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { OrderProps } from '@/types/order';
import OrderActions from '@/components/dashboard/order/order-actions';
import { OrdersFilters } from '@/components/dashboard/order/order-filters';
import { Button } from '@mui/material';
import { DownloadSimple as DownloadIcon } from '@phosphor-icons/react';
import { ClipSpinner } from '@/components/loader/spinner';



dayjs.extend(relativeTime);

const fetchOrders = async () => {
  const { data } = await axios.get('/api/orders');
  return data;
};

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    document.title = 'Manage Orders | Admin Dashboard';
  }, []);

  const { data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const filteredOrders = orders.filter((order: OrderProps) =>
    order.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.streetAddress?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const exportToPDF = () => {
    const doc = new jsPDF();

    // DEFINE TABLE COLUMNS+
    const tableColumn = ["Name", "Email", "Phone", "Address", "Transaction Ref", "Ordered At"];
    const tableRows: string[][] = [];

    orders.forEach((order: OrderProps) => {
      const orderData = [
        (order.firstName + ' ') + (order.lastName),
        order.email ?? '',
        order.phone ?? '',
        (order.streetAddress + ',') + (order.subCity + ',') + (order.city + ',') + (order.country),
        order.tx_ref ?? '',
        dayjs(order.createdAt).format('MMM D, YYYY'),
      ];
      tableRows.push(orderData);
    });

    // ADD TABLE to the PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('orders.pdf');
  };

  // PAGINATION
  function applyPagination(rows: OrderProps[], page: number, rowsPerPage: number): OrderProps[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  const paginatedRows = applyPagination(filteredOrders, page, rowsPerPage);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Orders</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" onClick={exportToPDF} startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <OrdersFilters onSearch={setSearchQuery} />
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          {isLoading ? (<ClipSpinner />
          ) : (
            <Table sx={{ minWidth: '800px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address Info</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((order) => (
                  <TableRow hover key={order._id}>
                    <TableCell>{`${order.firstName} ${order.lastName}`} <br />
                      <Typography color='blueviolet' variant='caption'>{dayjs(order.createdAt).fromNow()}</Typography>
                    </TableCell>

                    <TableCell>
                      {`${order.streetAddress}, ${order.subCity}, ${order.city}, ${order.country}`} <br />
                      <Typography color='blueviolet' variant='caption'>{order.phone}</Typography>
                    </TableCell>

                    <TableCell>
                      {order.line_items.map((item: {
                        price_data: {
                          product_data: any; name: React.Key | null | undefined;
                        }; quantity: any;
                      }, index: number) => (
                        <Typography sx={{ fontSize: '.85rem' }} key={index}>
                          {`${item.price_data.product_data.name} (x${item.quantity})`}
                        </Typography>
                      ))}
                    </TableCell>

                    <TableCell>
                      {order.line_items
                        .reduce((total: number, item: { price_data: { amount: number; }; quantity: number; }) => total + item.price_data.amount * item.quantity, 0)
                        .toLocaleString()} <Typography variant='caption'>ETB</Typography>
                    </TableCell>

                    <TableCell>{order.paid ?
                      <Typography sx={{ p: '4px 8px', textAlign: 'center', borderRadius: '25px', backgroundColor: 'green', color: '#f1f1f1', fontSize: '.8rem' }}>Verified</Typography> :
                      <Typography sx={{ p: '4px 8px', textAlign: 'center', borderRadius: '25px', backgroundColor: 'red', color: '#f1f1f1', fontSize: '.8rem' }}>No</Typography>}
                    </TableCell>

                    <TableCell sx={{ p: 0 }}>
                      {order.status === 'Pending' && (
                        <Typography
                          sx={{
                            backgroundColor: '#FFC107',
                            color: '#fff',
                            borderRadius: '25px',
                            fontSize: '.8rem',
                            padding: '4px 8px',
                            textAlign: 'center',
                          }}
                          variant="body2"
                        >
                          {order.status}
                        </Typography>
                      )}

                      {order.status === 'Shipped' && (
                        <Typography
                          sx={{
                            backgroundColor: '#0D6EFD',
                            color: '#fff',
                            borderRadius: '25px',
                            fontSize: '.8rem',
                            padding: '4px 8px',
                            textAlign: 'center',
                          }}
                          variant="body2"
                        >
                          {order.status}
                        </Typography>
                      )}

                      {order.status === 'On the Way' && (
                        <Typography
                          sx={{
                            width: '90px',
                            backgroundColor: '#0dcaf0',
                            color: '#fff',
                            borderRadius: '25px',
                            fontSize: '.8rem',
                            padding: '4px 6px',
                            textAlign: 'center',
                          }}
                          variant="body2"
                        >
                          {order.status}
                        </Typography>
                      )}

                      {order.status === 'Delivered' && (
                        <Typography
                          sx={{
                            backgroundColor: '#198754',
                            color: '#fff',
                            borderRadius: '25px',
                            fontSize: '.8rem',
                            padding: '4px 8px',
                            textAlign: 'center',
                          }}
                          variant="body2"
                        >
                          {order.status}
                        </Typography>
                      )}

                      {order.status === 'Cancelled' && (
                        <Typography
                          sx={{
                            backgroundColor: '#DC3545',
                            color: '#fff',
                            borderRadius: '25px',
                            fontSize: '.8rem',
                            padding: '4px 8px',
                            textAlign: 'center',
                          }}
                          variant="body2"
                        >
                          {order.status}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell sx={{ pr: 0 }}>
                      <OrderActions orderId={order._id} currentStatus={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Stack>
  );
};

export default OrdersPage;
