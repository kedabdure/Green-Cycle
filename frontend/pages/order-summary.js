import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Paper, Typography, Divider, Grid, Box, Button, CircularProgress } from '@mui/material';
import { DownloadSimple, House } from 'phosphor-react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const fetchOrderByTxRef = async (tx_ref) => {
  const { data } = await axios.get(`/api/orders?tx_ref=${tx_ref}`);
  return data;
};

export default function OrderSummary() {
  const router = useRouter();
  const { tx_ref } = router.query;

  React.useEffect(() => {
    document.title = "Order Summary - Green Cycle";
  }, [])

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', tx_ref],
    queryFn: () => fetchOrderByTxRef(tx_ref),
    enabled: !!tx_ref,
  });


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress style={{ color: '#333' }} />
      </Box>
    );
  }

  if (!order) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>No order found for this transaction.😔</Typography>
    </Box>
  );

  const totalAmount = order.line_items.reduce((sum, item) => sum + item.quantity * item.price_data.amount, 0);

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Order Info Table
    const orderInfoColumns = ["Field", "Details"];
    const orderInfoRows = [
      ["Transaction Reference", order.tx_ref],
      ["Name", `${order.firstName} ${order.lastName}`],
      ["Email", order.email],
      ["Phone", order.phone],
      ["Address", `${order.streetAddress}, ${order.subCity}, ${order.city}, ${order.country}`],
      ["Order Date", dayjs(order.createdAt).format('MMM D, YYYY')],
      ["Status", order.status],
    ];

    doc.setFontSize(16);
    doc.text(`Order Summary - Green Cycle`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Thank you for your purchase, ${order.firstName}!`, 14, 25);

    autoTable(doc, {
      startY: 30,
      head: [orderInfoColumns],
      body: orderInfoRows,
      theme: 'grid',
      headStyles: { fillColor: [56, 142, 60], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // Product Table
    const productColumns = ["Product", "Quantity", "Unit Price", "Total"];
    const productRows = order.line_items.map((item) => [
      item.price_data.product_data.name,
      item.quantity,
      `${item.price_data.amount.toFixed(2)} ETB`,
      `${(item.quantity * item.price_data.amount).toFixed(2)} ETB`,
    ]);

    autoTable(doc, {
      startY: doc.autoTable.previous.finalY + 10,
      head: [productColumns],
      body: productRows,
      theme: 'striped',
      headStyles: { fillColor: [33, 150, 243], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // Total Amount
    doc.setFontSize(12);
    doc.text(
      `Total Amount: ${totalAmount.toFixed(2)} ETB`,
      14,
      doc.autoTable.previous.finalY + 10
    );

    doc.save(`Order_${tx_ref}.pdf`);
  };

  const formattedPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <Paper
      elevation={4}
      sx={{
        padding: { xs: 2, md: 4 },
        maxWidth: 700,
        margin: '3rem auto',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Title and Thank You */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#111',
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Green Cycle
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#555', fontSize: { xs: '0.9rem', md: '1rem' } }}
        >
          Thank you for your purchase, {order.firstName}!😊
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Order Information and Delivery Address */}
      <Grid container spacing={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: '#388E3C', mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            Order Information
          </Typography>
          <Box sx={{ pl: { md: 2 } }}>
            <Typography variant="body2"><strong>Transaction Reference:</strong> {order.tx_ref}</Typography>
            <Typography variant="body2"><strong>Order Date:</strong> {dayjs(order.createdAt).format('MMM D, YYYY')}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {order.status}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: '#388E3C', mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            Delivery Address
          </Typography>
          <Box sx={{ pl: { md: 2 } }}>
            <Typography variant="body2"><strong>Name:</strong> {order.firstName} {order.lastName}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {order.email}</Typography>
            <Typography variant="body2"><strong>Phone:</strong> {order.phone}</Typography>
            <Typography variant="body2"><strong>Address:</strong> {order.streetAddress}, {order.subCity}, {order.city}, {order.country}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Product Summary */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', color: '#388E3C', textAlign: 'center', mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}
      >
        Order Summary
      </Typography>
      <Box sx={{ px: { xs: 2, md: 4 }, mb: 2 }}>
        {order.line_items.map((item) => (
          <Box
            key={item.price_data.product_data.id}
            display="flex"
            justifyContent="space-between"
            sx={{ py: 1, borderBottom: '1px solid #e0e0e0', fontSize: { xs: '0.85rem', md: '1rem' } }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{item.price_data.product_data.name}</Typography>
            <Typography variant="body2">{item.quantity} x {formattedPrice(item.price_data.amount.toFixed(2))} <span style={{ fontSize: '10px' }}>ETB</span></Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formattedPrice((item.quantity * item.price_data.amount).toFixed(2))} <span style={{ fontSize: '10px' }}>ETB</span></Typography>
          </Box>
        ))}
      </Box>

      {/* Total Amount */}
      <Box sx={{ textAlign: 'center', py: 2, bgcolor: '#f7f7f7', borderRadius: 1, mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: '#388E3C', fontSize: { xs: '1rem', md: '1.2rem' } }}
        >
          Total Amount: {formattedPrice(totalAmount.toFixed(2))} <span style={{ fontSize: '12px' }}>ETB</span>
        </Typography>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#111', color: '#111', minWidth: 120, fontSize: { xs: '0.8rem', md: '0.9rem' }, textTransform: 'none' }}
          onClick={exportToPDF}
          startIcon={<DownloadSimple size={20} />}
        >
          Download
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#111', color: '#fff', minWidth: 120, fontSize: { xs: '0.8rem', md: '0.9rem' }, textTransform: 'none' }}
          href="/"
          startIcon={<House size={20} />}
        >
          Home
        </Button>
      </Box>
    </Paper>
  );
}
