import { verifyPayment } from "../../lib/chapaService";
import { Order } from "../../models/Order";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Should be a GET request' });
  }
  const { trx_ref, status } = req.query;
  if (!trx_ref || !status) {
    return res.status(400).json({ error: 'trx_ref and status are required' });
  }
  try {
    await mongooseConnect();
    const tx_ref = trx_ref;
    const response = await verifyPayment(tx_ref);
    if (response.status === 'success') {
      const updateResult = await Order.updateOne({ tx_ref: tx_ref }, { paid: true });
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ error: 'Payment verification failed', details: response });
    }
  } catch (error) {
    console.error("Chapa Verification Error:", error);
    return res.status(500).json({ error: error.message || "Chapa Payment Verification Failed" });
  }
}
