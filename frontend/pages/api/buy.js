import { mongooseConnect } from "../../lib/mongoose";
import { Buy } from "../../models/Buy";

export default async (req, res) => {
  await mongooseConnect();

  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const buyDoc = await Buy.create(data);

    if (buyDoc) {
      res.status(201).json({ success: true, data: buyDoc });
    }
    res.status(400).json({ success: false });
  }

  if (req.method === "GET") {
    const buyDoc = await Buy.find().sort({ createdAt: -1 });

    if (buyDoc) {
      res.status(200).json({ success: true, data: buyDoc });
    }
    res.status(400).json({ success: false });
  }
}
