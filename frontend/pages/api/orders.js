import { mongooseConnect } from "../../lib/mongoose";
import { Order } from "../../models/Order";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Should be a GET request' });
  }

  const { tx_ref } = req.query;
  if (!tx_ref) {
    return res.status(400).json({ error: 'tx_ref is required' });
  }

  try {
    await mongooseConnect();
    const order = await Order.findOne({ tx_ref: tx_ref });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ error: error.message || "Error fetching order" });
  }
}
