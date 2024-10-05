import User from "../../models/User";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const userDoc = await User.create({ name, email, password });
    res.status(201).json({ ...userDoc.toObject(), password: undefined });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
