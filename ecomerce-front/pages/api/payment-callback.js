import { verifyPayment } from "@/lib/chapaService";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Should be a POST request' });
  }

  const { tx_ref, status } = req.body;

  if (!tx_ref || !status) {
    return res.status(400).json({ error: 'tx_ref and status are required' });
  }

  try {
    const response = await verifyPayment(tx_ref);
    console.log("Chapa Verify Response:", response);
    
    if (response.status === 'success') {
      // Handle successful verification
      console.log("payment verified successfully")
      return res.status(200).json(response);
    } else {
      // Handle verification failure
      return res.status(400).json({ error: 'Payment verification failed', details: response });
    }
  } catch (error) {
    console.error("Chapa Verification Error:", error);
    return res.status(500).json({ error: error.message || "Chapa Payment Verification Failed" });
  }
}
