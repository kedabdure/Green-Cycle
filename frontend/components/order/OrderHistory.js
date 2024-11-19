import React from 'react';
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { CheckCircle, Truck, XCircle, Airplane, Clock } from 'phosphor-react';
import useUser from '../context/userContex';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductsFilters from './products-filters';
import axios from 'axios';

const placeholderImage = '/assets/images/hero-small1.jpg';

const fetchOrders = async (userId) => {
  const { data } = await axios.get(`/api/orders?userId=${userId}`);
  return data;
};

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const queryClient = useQueryClient();
  const user = useUser();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => fetchOrders(user?.id),
    enabled: !!user?.id,
  });

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredOrders = orders.filter((order) => {
    const txMatch = order.tx_ref.toLowerCase().includes(searchQuery.toLowerCase());
    const productMatch = order.line_items.some((item) =>
      item.price_data.product_data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return txMatch || productMatch;
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: '90px', lg: '120px' },
        px: { xs: '1rem', sm: '1.5rem', md: '3rem', lg: '5rem' },
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: '600',
          mb: '2rem',
          ml: { xs: '.5rem', sm: '0' },
          color: '#333',
        }}
      >
        Order History
      </Typography>

      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          backgroundColor: '#fff',
          mb: { xs: 2, md: 3 },
        }}
      >
        <ProductsFilters onSearch={setSearchQuery} />
      </Box>

      {filteredOrders.length === 0 ? (
        <Typography
          sx={{
            textAlign: 'center',
            color: '#555',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          No orders found matching your search.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {filteredOrders.map((order) => (
            <Box
              key={order.tx_ref}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                padding: { xs: '1rem', sm: '1.5rem' },
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Order Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: '600', fontSize: { xs: '.8rem', md: '1rem' }, maxWidth: { xs: '100px', md: '100%' } }}
                  >
                    ORDER #{order.tx_ref}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '.7rem', md: '.85rem' } }}>
                    Placed on: {new Date(order.createdAt).toDateString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.3rem',

                    '& svg': {
                      size: { xs: '1rem', md: '1rem' },
                    }
                  }}
                >
                  {order.status === 'Pending' && <Clock size={24} color="#FFA726" weight="fill" />}
                  {order.status === 'Shipped' && <Truck size={24} color="#42A5F5" weight="fill" />}
                  {order.status === 'On the Way' && <Airplane size={24} color="#AB47BC" weight="fill" />}
                  {order.status === 'Delivered' && <CheckCircle size={24} color="#66BB6A" weight="fill" />}

                  <Typography
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color:
                        order.status === 'Pending'
                          ? '#FFA726'
                          : order.status === 'Shipped'
                            ? '#42A5F5'
                            : order.status === 'On the Way'
                              ? '#AB47BC'
                              : '#66BB6A',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {order.status}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Order Items */}
              {order.line_items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Image
                      src={item.image || placeholderImage}
                      fill
                      sizes="100%"
                      style={{ objectFit: 'cover' }}
                      alt={item.price_data.product_data.name}
                    />
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: '600', fontSize: { xs: '0.9rem', md: '1rem' } }}
                    >
                      {item.price_data.product_data.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {formatPrice(item.price_data.amount)} <span style={{ fontSize: '0.8rem' }}>ETB</span>
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Order Total */}
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: '.2rem',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: { xs: '.9rem', md: '1.1rem' },
                  }}
                >
                  Total: {formatPrice(
                    order.line_items.reduce((total, item) => total + item.quantity * item.price_data.amount, 0)
                  )}{' '}
                  <span style={{ fontSize: '0.9rem' }}>ETB</span>
                </Typography>
                <Button
                  onClick={() => queryClient.invalidateQueries({ queryKey: ['orders'] })
                  }
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: '#111',
                    color: '#fff',
                    ':hover': { backgroundColor: '#333' },
                  }}
                  startIcon={<Truck size={20} weight="bold" />}
                >
                  Track Order
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )
      }
    </Box >
  );
};

export default OrderHistory;
