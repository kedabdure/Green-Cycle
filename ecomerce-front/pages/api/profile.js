import { mongooseConnect } from "../../lib/mongoose";
import User from "../../models/User";

export default async function handle(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { name, email } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and Name are required" });
  }
  try {
    await mongooseConnect();
    const userDoc = await User.findOneAndUpdate(
      { email },
      { name },
      { new: true, runValidators: true }
    );
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(userDoc);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
