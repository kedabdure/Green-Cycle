import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { OrderProps } from '@/types/order';

export interface LatestOrdersProps {
  orders?: OrderProps[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest orders" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Location</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow hover key={order._id}>
                  <TableCell>{order.firstName} {order.lastName}</TableCell>
                  <TableCell>{order.streetAddress}, {order.city}, {order.country}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell sx={{ p: 0 }}>
                    {order.status === 'Pending' && (
                      <Typography
                        sx={{
                          width: '90px',
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
                          width: '90px',
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
                          width: '90px',
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
                          width: '90px',
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

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          href="/dashboard/orders"
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
