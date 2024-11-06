import { mongooseConnect } from "../../lib/mongoose";
import { Category } from "../../models/Category";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await mongooseConnect();
  const categories = await Category.find().sort({ createdAt: -1 });
  if (!categories) {
    return res.status(404).json({ message: "Categories not found" });
  }
  res.status(200).json(categories);
}
