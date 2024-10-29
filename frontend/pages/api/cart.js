import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
  await mongooseConnect();
  // Convert ids to mongoose ObjectId instances if they are not already
  const ids = req.body.ids?.map(id => new mongoose.Types.ObjectId(String(id)));

  try {
    // Use `$in` to search for multiple IDs in an array
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
