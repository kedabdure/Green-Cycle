import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
          console.error("Error fetching order:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchOrder();
  }, [tx_ref]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Order ID: {order._id}</p>
      <p>Transaction Reference: {order.tx_ref}</p>
      <p>Status: {order.paid ? 'Paid' : 'Pending'}</p>
      <p>Total Items: {order.line_items.length}</p>
      <button onClick={() => window.print()}>Download Receipt</button>
    </div>
  );
}
