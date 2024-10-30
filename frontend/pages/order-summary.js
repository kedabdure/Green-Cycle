import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import { Box, Button, Typography, Divider, CircularProgress } from '@mui/material';
import { DownloadSimple, House } from 'phosphor-react';
import { useRouter } from 'next/router';
import { CartContext } from '@/components/cart/CartContext';

const fetchOrderByTxRef = async (tx_ref) => {
  const { data } = await axios.get(`/api/orders?tx_ref=${tx_ref}`);
  return data;
};

export default function OrderSummary() {
  const router = useRouter();
  const { tx_ref } = router.query;
  const { clearCart } = useContext(CartContext);

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

  if (error) {
    console.error("Error fetching order:", error);
    return <Typography color="error">Error loading order.</Typography>;
  }

  if (!order) {
    return <Typography>No order found for this transaction.</Typography>;
  }
  clearCart();


  const totalAmount = order.line_items.reduce((sum, item) => sum + (item.quantity * item.price_data.amount), 0);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // PDF Export function
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Product", "Quantity", "Unit Price", "Total"];
    const tableRows = order.line_items.map((item) => [
      item.price_data.product_data.name,
      item.quantity,
      `ETB ${formatNumber(item.price_data.amount.toFixed(2))}`,
      `ETB ${formatNumber((item.quantity * item.price_data.amount).toFixed(2))}`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [56, 142, 60] },
      styles: { fontSize: 10, font: 'helvetica' },
    });

    // Title and summary details
    doc.text(`Order Summary - ${order.firstName} ${order.lastName}`, 14, 10);
    doc.text(`Total: ETB ${formatNumber(totalAmount.toFixed(2))}`, 14, 20);

    // Adding order details and address to the PDF
    doc.text(`Transaction Reference: ${order.tx_ref}`, 14, 30);
    doc.text(`Name: ${order.firstName} ${order.lastName}`, 14, 35);
    doc.text(`Email: ${order.email}`, 14, 40);
    doc.text(`Phone: ${order.phone}`, 14, 45);
    doc.text(`Address: ${order.streetAddress}, ${order.subCity}, ${order.city}, ${order.country}`, 14, 50);
    doc.text(`Order Date: ${dayjs(order.createdAt).format('MMM D, YYYY')}`, 14, 55);
    doc.text(`Status: ${order.status}`, 14, 60);

    doc.save(`Order_${tx_ref}.pdf`);
  };

  return (
    <Box p={3} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4" style={{ color: '#388E3C', fontWeight: 'bold' }}>Green Cycle</Typography>
      <Typography variant="h6" gutterBottom>Thank you for your purchase, {order.firstName}!</Typography>

      <Divider style={{ margin: '20px 0' }} />

      <Box textAlign="left" style={{ lineHeight: 1.6 }}>
        <Typography variant="body1"><strong>Transaction Reference:</strong> {order.tx_ref}</Typography>
        <Typography variant="body1"><strong>Name:</strong> {order.firstName} {order.lastName}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {order.email}</Typography>
        <Typography variant="body1"><strong>Phone:</strong> {order.phone}</Typography>
        <Typography variant="body1"><strong>Address:</strong> {order.streetAddress}, {order.subCity}, {order.city}, {order.country}</Typography>
        <Typography variant="body1"><strong>Order Date:</strong> {dayjs(order.createdAt).format('MMM D, YYYY')}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {order.status}</Typography>
        <Typography variant="h6" style={{ marginTop: 10 }}><strong>Total Amount:</strong> {totalAmount.toFixed(2)} <small>ETB</small> </Typography>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box mt={2}>
        <Button
          variant="contained"
          color="green"
          onClick={exportToPDF}
          startIcon={<DownloadSimple size={20} />}
          style={{ marginRight: 10, textTransform: 'none' }}
        >
          Download
        </Button>
        <Button
          variant="contained"
          color="green"
          href="/"
          startIcon={<House size={20} />}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}
