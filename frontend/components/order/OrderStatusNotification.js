import { useEffect, useState } from 'react';
import { Button, Box, Typography, Popover, Stack, Divider } from '@mui/material';
import { MapPin, Clock, Truck, CheckCircle, PhoneCall } from 'phosphor-react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const fetchOrders = async (userId) => {
  const { data } = await axios.get(`/api/orders?userId=${userId}`);
  return data;
};

export default function OrderStatusNotification() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [phoneAnchorEl, setPhoneAnchorEl] = useState(null);

  const { data: activeOrders = [] } = useQuery({
    queryKey: ['activeOrder', session?.user?.id],
    queryFn: () => fetchOrders(session?.user?.id),
    enabled: !!session,
<<<<<<< HEAD
=======
    refetchInterval: 60000,
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
  });

  console.log(activeOrders)
  console.log(session)

  useEffect(() => {
    if (activeOrders.length > 0) {
      const latestOrder = activeOrders[0];
      if (latestOrder.status !== orderStatus) {
        setOrderStatus(latestOrder.status);
<<<<<<< HEAD
        if (latestOrder.status !== 'Delivered') {
          setAnchorEl(document.body);
        } else {
          setAnchorEl(document.body);
          setTimeout(() => {
            setAnchorEl(null);
          }, 3000); // Show 'Delivered' for a short period
        }
=======
        setAnchorEl(document.body);
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
      }
    }
  }, [activeOrders, orderStatus]);

  const handleClose = () => setAnchorEl(null);
  const handlePhoneClick = (event) => setPhoneAnchorEl(event.currentTarget);
  const handlePhoneClose = () => setPhoneAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'order-status-popover' : undefined;
  const phoneOpen = Boolean(phoneAnchorEl);
  const phoneId = phoneOpen ? 'phone-popover' : undefined;

  const statusList = [
    { label: 'Pending', icon: <Clock size={24} />, description: 'Your order is processing' },
    { label: 'Shipped', icon: <MapPin size={24} />, description: 'Order has been shipped' },
    { label: 'On the Way', icon: <Truck size={24} />, description: 'Order is on its way' },
    { label: 'Delivered', icon: <CheckCircle size={24} />, description: 'Order delivered' },
  ];

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  return (
    <>
      {/* Status Button */}
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          textTransform: 'none',
          width: '250px',
          height: '75px',
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
<<<<<<< HEAD
          {statusList.find((status) => status.label === orderStatus)?.icon}
=======
          {statusList.find(status => status.label === orderStatus)?.icon}
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: 'left', color: '#111', fontSize: '16px', fontWeight: '700' }}>
            {orderStatus || 'No Active Orders'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: '400', color: '#555' }}>
            Track your order
          </Typography>
        </Box>
      </Button>

      {/* Popover for Order Status Tracking */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 600 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        sx={{ mt: 5 }}
      >
<<<<<<< HEAD
        <Stack spacing={2} sx={{ p: 3, width: '350px' }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '600', mb: '10px' }}>
              Your order status
            </Typography>
=======
        <Stack
          spacing={2}
          sx={{
            p: 3,
            width: "350px",
          }}
        >
          <Box>
            <Typography variant='h6' sx={{ fontSize: '18px', fontWeight: '600', mb: '10px' }}>Your order status</Typography>
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
            <Divider />
          </Box>
          {statusList.map((status, index) => {
            const isActive = orderStatus === status.label;
<<<<<<< HEAD
            const isCompleted = statusList.findIndex((s) => s.label === orderStatus) >= index;
=======
            const isCompleted = statusList.findIndex(s => s.label === orderStatus) >= index;
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
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
<<<<<<< HEAD
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
=======
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: '10px',
                    background: isActive ? '#5932EA' : isCompleted ? '#d3e5ff' : '#E5E5FE',
                    borderRadius: '50%',
                    color: isActive ? '#fff' : 'inherit'
                  }}>
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
                    {status.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '700', color: isActive ? '#111' : '#888' }}>
                      {status.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
                      {status.description}
                    </Typography>
                  </Box>
                </Box>
                {/* Vertical Dashes */}
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
<<<<<<< HEAD
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
=======
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Box>
              <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: '600', color: '#b0b0b0' }}>Admin</Typography>
              <Typography variant='body1' sx={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>Green Cycle</Typography>
              <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: '600', color: '#555' }}>Rescue & Reuse</Typography>
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
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
<<<<<<< HEAD
                  backgroundColor: '#E5E5FE',
                },
=======
                  backgroundColor: "#E5E5FE"
                }
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
              }}
              onClick={handlePhoneClick}
            >
              <PhoneCall size={32} color="#5932EA" />
            </Box>

            {/* Popover for Phone Number */}
            <Popover
              id={phoneId}
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
              sx={{ borderRadius: '24px' }}
            >
              <Box sx={{ p: 2 }}>
<<<<<<< HEAD
                <Typography sx={{ color: '#111', fontWeight: '500', letterSpacing: '1.5' }}>0953431572</Typography>
=======
                <Typography variant="body1" sx={{ color: '#111', fontWeight: '600' }}>
                  0953431572
                </Typography>
>>>>>>> 1294554d25f71b114ae43e0d48d4c3993065a8b3
              </Box>
            </Popover>
          </Box>
        </Stack>
      </Popover>
    </>
  );
}
