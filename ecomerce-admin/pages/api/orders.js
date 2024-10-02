import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await mongooseConnect();

    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
