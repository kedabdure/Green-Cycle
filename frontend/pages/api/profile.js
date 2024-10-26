import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { mongooseConnect } from "../../lib/mongoose";
import User from "../../models/User";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user || !session.user.email) {
        return res.status(401).json({ error: "Unauthorized access. Please login first." });
      }

      const userDoc = await User.findOne({ email: session.user.email });
      if (!userDoc) {
        return res.status(404).json({ error: "User profile not found. Please check your account details." });
      }

      return res.status(200).json(userDoc);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Failed to fetch profile. Please try again later." });
    }
  }

  else if (req.method === "PUT") {
    const { name, email, phone, streetAddress, city, country, postalCode, image } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required to update your profile." });
    }

    try {
      const userDoc = await User.findOneAndUpdate(
        { email },
        { name, phone, streetAddress, city, country, postalCode, image },
        { new: true, runValidators: true }
      );

      if (!userDoc) {
        return res.status(404).json({ error: "Could not find user. Please check the provided details." });
      }

      // After a successful update, send a 200 response with the updated user document
      return res.status(200).json({ message: "Profile updated successfully.", user: userDoc });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Could not update profile. Please try again later." });
    }
  }

  else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ error: "Method not allowed. Only GET and PUT requests are supported." });
  }
}
