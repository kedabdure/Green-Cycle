import User from "../../models/User";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Debug statements to verify the model and inputs
      console.log("Received request data:", { name, email, password });
      console.log("User model:", User);

      // Ensure that the model is correctly referenced before creating a document
      if (!User) {
        throw new Error("User model is not defined");
      }

      const userDoc = await User.create({ name, email, password });
      res.status(201).json(userDoc);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "An error occurred while creating the user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
