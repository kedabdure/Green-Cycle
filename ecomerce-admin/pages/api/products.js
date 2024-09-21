import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    try {
      const { title, description, price } = req.body;

      // Add input validation here (e.g., using Joi or other validation libraries)

      const productDoc = await Product.create({
        title,
        description,
        price,
      });

      res.status(201).json(productDoc); // Use 201 Created status code
      console.log("Product created successfully:", productDoc);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle other request methods if needed
    res.status(405).end(); // Method not allowed
  }
}