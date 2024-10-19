'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
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
import dayjs from 'dayjs';
import axios from 'axios';

import { OrderProps } from '@/types/order';
import OrderActions from '@/components/dashboard/order/order-actions';

const fetchOrders = async () => {
  const { data } = await axios.get('/api/orders');
  return data;
};

const OrdersPage = () => {
  const { data: orders = [], isLoading: isLoadingOrders, isError: isErrorOrders, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // PAGINATION
  function applyPagination(rows: OrderProps[], page: number, rowsPerPage: number): OrderProps[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  const paginatedRows = applyPagination(orders, page, rowsPerPage);

  if (isLoadingOrders) return <div>Loading...</div>;

  if (isErrorOrders) return (
    <div>
      <Typography variant="h6" color="error">
        Error fetching orders: {error.message}
      </Typography>
    </div>
  );

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
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
                <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
                <TableCell>
                  {`${order.streetAddress}, ${order.subCity}, ${order.city}, ${order.country}`}
                </TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>
                  {order.line_items.map((item: {
                    price_data: {
                      product_data: any; name: React.Key | null | undefined;
                    }; quantity: any;
                  }, index: number) => (
                    <Typography sx={{ fontSize: '.9rem' }} key={index}>
                      {`${item.price_data.product_data.name} (x${item.quantity})`}
                    </Typography>
                  ))}
                </TableCell>

                <TableCell>
                  {order.line_items
                    .reduce((total: number, item: { price_data: { amount: number; }; quantity: number; }) => total + item.price_data.amount * item.quantity, 0)
                    .toLocaleString()} ETB
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
  );
};

export default OrdersPage;
