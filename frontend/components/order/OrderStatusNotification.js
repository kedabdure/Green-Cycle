import { useEffect, useState } from 'react';
import { Button, Box, Typography, Popover, Stack, Divider } from '@mui/material';
import { MapPin, Clock, Truck, CheckCircle } from 'phosphor-react';
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

  const { data: activeOrders = [] } = useQuery({
    queryKey: ['activeOrder', session?.user?.id],
    queryFn: () => fetchOrders(session?.user?.id),
    enabled: !!session,
    refetchInterval: 60000, // Refetch every 60 seconds to check for status changes
  });

  useEffect(() => {
    if (activeOrders.length > 0) {
      const latestOrder = activeOrders[0];
      if (latestOrder.status !== orderStatus && latestOrder.status !== 'Delivered') {
        setOrderStatus(latestOrder.status);
        setAnchorEl(document.body); // Trigger the popover to open
      }
    }
  }, [activeOrders, orderStatus]);

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'order-status-popover' : undefined;

  const statusList = [
    { label: 'Pending', icon: <Clock size={24} />, description: "Your order is processing" },
    { label: 'Shipped', icon: <MapPin size={24} />, description: "Order has been shipped" },
    { label: 'On the Way', icon: <Truck size={24} />, description: "Order is on its way" },
    { label: 'Delivered', icon: <CheckCircle size={24} />, description: "Order delivered" },
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
          position: "fixed",
          bottom: "80px",
          right: "20px",
          textTransform: "none",
          width: "250px",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: 'flex-start',
          gap: "1rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', background: '#E5E5FE', borderRadius: '50%' }}>
          {statusList.find(status => status.label === orderStatus)?.icon}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: 'left', color: "#111", fontSize: '16px', fontWeight: "700" }}>{orderStatus}</Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: "400", color: "#555" }}>Track your order</Typography>
        </Box>
      </Button>

      {/* Popover for Order Status Tracking */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 400 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        sx={{ mt: 2 }}
      >
        <Stack
          spacing={2}
          sx={{
            p: 2,
            width: "350px",
          }}
        >
          {statusList.map((status, index) => {
            const isActive = orderStatus === status.label;
            const isCompleted = statusList.findIndex(s => s.label === orderStatus) >= index;

            return (
              <Box key={status.label}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: isActive ? "#E5E5FE" : isCompleted ? "#f0f0ff" : "transparent",
                    p: 1,
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: '8px', background: isCompleted ? '#d3e5ff' : '#E5E5FE', borderRadius: '50%' }}>
                    {status.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: "700", color: isActive ? "#111" : "#888" }}>{status.label}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', color: "#555" }}>{status.description}</Typography>
                  </Box>
                </Box>
                {index < statusList.length - 1 && <Divider sx={{ borderColor: "#ccc", mt: 1, mb: 1 }} />}
              </Box>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}
