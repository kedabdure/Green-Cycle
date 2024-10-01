import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import jsPDF from 'jspdf';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333333;
  margin-bottom: 20px;
`;

const OrderDetails = styled.div`
  text-align: left;
  margin-bottom: 20px;
  p {
    margin: 5px 0;
  }
`;

const LineItemsContainer = styled.div`
  margin: 20px 0;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
`;

const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eaeaea;
`;

const ItemDetail = styled.span`
  font-size: 0.9em;
  color: #555;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  color: #0070f3;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function OrderSummary() {
  const router = useRouter();
  const { tx_ref } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (tx_ref) {
        try {
          const response = await axios.get(`/api/orders?tx_ref=${tx_ref}`);
          setOrder(response.data);
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
    return order.line_items.reduce((total, item) => total + item.quantity * item.price_data.amount, 0);
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

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <Container>
      <Card>
        <Title>Order Summary</Title>
        <OrderDetails>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Transaction Reference:</strong> {order.tx_ref}</p>
          <p><strong>Status:</strong> {order.paid ? 'Paid' : 'Pending'}</p>
          <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Country:</strong> {order.country}</p>
          <p><strong>City:</strong> {order.city}</p>
          <p><strong>Sub-City:</strong> {order.subCity}</p>
          <p><strong>Wereda:</strong> {order.wereda}</p>
          <p><strong>Street Address:</strong> {order.streetAddress}</p>
        </OrderDetails>
        <LineItemsContainer>
          <h3>Order Details</h3>
          {order.line_items.map((item, index) => (
            <LineItem key={index}>
              <ItemDetail><strong>{item.price_data.product_data.name}</strong></ItemDetail>
              <ItemDetail>Qty: {item.quantity}</ItemDetail>
              <ItemDetail>Price: {item.price_data.amount} ETB</ItemDetail>
              <ItemDetail>Total: {item.quantity * item.price_data.amount} ETB</ItemDetail>
            </LineItem>
          ))}
        </LineItemsContainer>
        <TotalPrice>Total Price: {calculateTotalPrice()} ETB</TotalPrice>
        <Button onClick={downloadReceipt}>Download Receipt</Button>
        <Button onClick={() => router.push('/')}>Go to Home</Button>
      </Card>
    </Container>
  );
}
