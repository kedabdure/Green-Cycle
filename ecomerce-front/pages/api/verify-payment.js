import { verifyPayment } from '@/lib/chapaService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { tx_ref } = req.body;
      const response = await verifyPayment(tx_ref);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
