import { mongooseConnect } from "../../lib/mongoose";
import User from "../../models/User";

export default async function handle(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { name, email, phone, streetAddress, city, country, postalCode } = req.body;

  try {
    await mongooseConnect();

    const userDoc = await User.findOneAndUpdate(
      { email },
      { name, phone, streetAddress, city, country, postalCode },
      { new: true, runValidators: true }
    );
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(userDoc)
    res.json(userDoc);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
