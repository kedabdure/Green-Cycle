import { useEffect, useState } from 'react';
import { Button, Box, Typography, Popover, Stack, Divider } from '@mui/material';
import { MapPin, Clock, Truck, CheckCircle, PhoneCall } from 'phosphor-react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Draggable from 'react-draggable';
import OrderConfirmationCard from './OrderConfirmationCard';

const fetchOrders = async (userId) => {
  const { data } = await axios.get(`/api/orders?userId=${userId}`);
  return data;
};

export default function OrderStatusNotification() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [showOrderDeliveredCard, setOrderDeliveredCard] = useState(false);
  const [phoneAnchorEl, setPhoneAnchorEl] = useState(null);

  // Fetching active orders
  const { data: activeOrders = [] } = useQuery({
    queryKey: ['activeOrder', session?.user?.id],
    queryFn: () => fetchOrders(session?.user?.id),
    enabled: !!session,
  });

  useEffect(() => {
    if (activeOrders.length > 0) {
      const latestActiveOrder = activeOrders[0];

      if (latestActiveOrder.status === 'Delivered' && latestActiveOrder.notifiedDelivered === false) {
        setOrderStatus('Delivered');
        setOrderDeliveredCard(true);

        setTimeout(() => setShowStatusNotification(false), 5000);

        axios.put(`/api/orders?id=${latestActiveOrder._id}`, { notifiedDelivered: true })
          .catch(error => console.error('Failed to update order notification status', error));
      } else if (latestActiveOrder.status !== 'Delivered') {
        if (latestActiveOrder.notifiedDelivered) {
          axios.put(`/api/orders?id=${latestActiveOrder._id}`, { notifiedDelivered: false })
            .catch(error => console.error('Failed to reset order notification status', error));
        }
        setOrderStatus(latestActiveOrder.status);
        setShowStatusNotification(true);
        setOrderDeliveredCard(false);
      }
    } else {
      setOrderStatus('No Active Orders');
      setShowStatusNotification(false);
    }
  }, [activeOrders]);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'order-status-popover' : undefined;

  const statusList = [
    { label: 'Pending', icon: <Clock size={24} />, description: 'Your order is processing' },
    { label: 'Shipped', icon: <MapPin size={24} />, description: 'Order has been shipped' },
    { label: 'On the Way', icon: <Truck size={24} />, description: 'Order is on its way' },
    { label: 'Delivered', icon: <CheckCircle size={24} />, description: 'Order delivered' },
  ];

  const handlePhoneClick = (event) => setPhoneAnchorEl(event.currentTarget);
  const handlePhoneClose = () => setPhoneAnchorEl(null);
  const phoneOpen = Boolean(phoneAnchorEl);

  return (
    <>
      {/* Draggable Status Button */}
      {showStatusNotification && (
        <Draggable>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              position: 'fixed',
              bottom: { xs: '20px', sm: '80px' },
              right: { xs: '10px', sm: '20px' },
              textTransform: 'none',
              width: { xs: '200px', sm: '250px' },
              height: { xs: '60px', sm: '75px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', background: '#5932EA', borderRadius: '50%' }}>
              {statusList.find((status) => status.label === orderStatus)?.icon}
            </Box>
            <Box>
              <Typography variant="h5" sx={{ textAlign: 'left', color: '#111', fontSize: '16px', fontWeight: '700' }}>
                {orderStatus || 'No Active Orders'}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: '400', color: '#555' }}>
                Track your order
              </Typography>
            </Box>
          </Button>
        </Draggable>
      )}

      {/* Popover for Order Status Tracking */}
      {showStatusNotification && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{ borderRadius: '32px' }}
        >
          <Stack spacing={2} sx={{ p: { xs: '1rem', md: '1.2rem' }, width: { xs: '100%', sm: '350px' }, borderRadius: '16px' }}>
            <Box>
              <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600', mb: '10px' }}>
                Your order status
              </Typography>
              <Divider />
            </Box>
            {statusList.map((status, index) => {
              const isActive = orderStatus === status.label;
              const isCompleted = statusList.findIndex((s) => s.label === orderStatus) >= index;
              const nextIndexExists = index < statusList.length - 1;

              return (
                <Box key={status.label} sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      backgroundColor: isActive ? '#E5E5FE' : isCompleted ? '#f0f0ff' : 'transparent',
                      p: 1,
                      borderRadius: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: '10px',
                        background: isActive ? '#5932EA' : isCompleted ? '#d3e5ff' : '#E5E5FE',
                        borderRadius: '50%',
                        color: isActive ? '#fff' : 'inherit',
                      }}
                    >
                      {status.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '700', color: isActive ? '#111' : '#888' }}>
                        {status.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
                        {status.description}
                      </Typography>
                    </Box>
                  </Box>
                  {nextIndexExists && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '29px',
                        top: '56px',
                        height: '24px',
                        borderLeft: '2px dashed',
                        borderColor: isActive ? '#5932EA' : isCompleted ? '#5932EA' : '#d3e5ff',
                      }}
                    />
                  )}
                </Box>
              );
            })}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', color: '#b0b0b0' }}>
                  Admin
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>
                  Green Cycle
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', color: '#555' }}>
                  Rescue & Reuse
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#F7F5FF',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all .3s ease',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#E5E5FE',
                  },
                }}
                onClick={handlePhoneClick}
              >
                <PhoneCall size={32} color="#5932EA" />
              </Box>
              <Popover
                open={phoneOpen}
                anchorEl={phoneAnchorEl}
                onClose={handlePhoneClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ p: '.5rem 1rem' }}>
                  <Typography sx={{ color: '#111', fontWeight: '500', fontSize: '1rem', fontWeight: '700' }}>Customer Support</Typography>
                  <Typography sx={{ color: '#111', fontWeight: '500', fontSize: '.85rem', fontWeight: '600' }}>(+251) 953-431-572</Typography>
                </Box>
              </Popover>
            </Box>
          </Stack>
        </Popover>
      )}

      {/* Card for Order Delivered Notification */}
      {showOrderDeliveredCard && (
        <OrderConfirmationCard />
      )}
    </>
  );
}
