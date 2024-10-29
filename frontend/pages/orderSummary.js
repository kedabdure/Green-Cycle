import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import jsPDF from 'jspdf';
import { CartContext } from '../components/cart/CartContext';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 10px;
  background: #ffffff; /* White background for the receipt */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
`;

const ReceiptHeader = styled(Typography)`
  color: #ff5722; /* Vibrant color for the title */
  font-size: 1.5rem !important;
  font-weight: 800 !important;

  text-align: center;
  margin-bottom: 15px;
`;

const LineItemsContainer = styled.div`
  margin: 20px 0;
  background: rgba(240, 240, 240, 0.8); /* Light gray background for line items */
  padding: 10px;
  border-radius: 5px;
`;

const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TotalPrice = styled.p`
  font-weight: bold;
  font-size: 1.3em;
  color: #ff5722; /* Color for the total price */
  margin: 10px 0;
`;

const StyledButton = styled(Button)`
  margin: 10px 0 20px 0 !important;
  width: 100%;
  max-width: 200px;
  font-size: .9em;
  text-transform: none !important;
  margin-right: 10px !important;
`;

export default function OrderSummary() {
  const router = useRouter();
  const { tx_ref } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchOrder() {
      if (tx_ref) {
        try {
          const response = await axios.get(`/api/orders?tx_ref=${tx_ref}`);
          setOrder(response.data);
          clearCart();
        } catch (error) {
          console.error('Error fetching order:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchOrder();
  }, [tx_ref]);

  // Calculate the total price of all items
  const calculateTotalPrice = () => {
    if (!order || !order.line_items) return 0;
    return order.line_items.reduce((total, item) => total + (item.quantity * item.price_data.amount), 0);
  };

  // Generate PDF for download
  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Order Summary', 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 30);
    doc.text(`Transaction Reference: ${order.tx_ref}`, 20, 40);
    doc.text(`Status: ${order.paid ? 'Paid' : 'Pending'}`, 20, 50);
    doc.text(`Customer: ${order.firstName} ${order.lastName}`, 20, 60);
    doc.text(`Phone: ${order.phone}`, 20, 70);
    doc.text(`Email: ${order.email}`, 20, 80);
    doc.text(`Country: ${order.country}`, 20, 90);
    doc.text(`City: ${order.city}`, 20, 100);
    doc.text(`Sub-City: ${order.subCity}`, 20, 110);
    doc.text(`Street Address: ${order.streetAddress}`, 20, 120);

    doc.text('Order Details:', 20, 140);
    order.line_items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.price_data.product_data.name} - Qty: ${item.quantity} x Price: ${item.price_data.amount} ETB = ${item.quantity * item.price_data.amount} ETB`,
        20,
        150 + index * 10
      );
    });

    doc.text(`Total Price: ${calculateTotalPrice()} ETB`, 20, 160 + order.line_items.length * 10);
    doc.save(`Order-${order.tx_ref}.pdf`);
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (!order) return <Typography variant="h6">No order found.</Typography>;

  return (
    <Container>
      <StyledPaper elevation={3}>
        <ReceiptHeader gutterBottom>Order Summary</ReceiptHeader>
        <Divider style={{ marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Order ID: {order._id}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Transaction Reference: {order.tx_ref}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Status: {order.paid ? 'Paid' : 'Pending'}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Customer: {order.firstName} {order.lastName}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Phone: {order.phone}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Email: {order.email}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Country: {order.country}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>City: {order.city}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Sub-City: {order.subCity}</Typography>
            <Typography sx={{ fontSize: '.95rem', mb: '.3rem'}}>Street Address: {order.streetAddress}</Typography>
          </Grid>
        </Grid>
        <LineItemsContainer>
          <Typography variant="h5" gutterBottom>Order Details</Typography>
          {order.line_items.map((item, index) => (
            <LineItem key={index}>
              <span><strong>{item.price_data.product_data.name}</strong></span>
              <span>Qty: {item.quantity}</span>
              <span>Price: {item.price_data.amount} ETB</span>
              <span>Total: {item.quantity * item.price_data.amount} ETB</span>
            </LineItem>
          ))}
        </LineItemsContainer>
        <TotalPrice>Total Price: {calculateTotalPrice()} ETB</TotalPrice>
        <StyledButton variant="contained" color="primary" onClick={downloadReceipt}>
          Download Receipt
        </StyledButton>
        <StyledButton variant="outlined" color="secondary" onClick={() => router.push('/')}>
          Go to Home
        </StyledButton>
      </StyledPaper>
    </Container>
  );
}
