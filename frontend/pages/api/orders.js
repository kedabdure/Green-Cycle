import { mongooseConnect } from "../../lib/mongoose";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  
  // Set the allowed HTTP methods
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  res.setHeader("Allow", allowedMethods);

  const { id, tx_ref, userId } = req.query;

  try {
    // GET Request Handling
    if (req.method === "GET") {
      let response;

      if (id) {
        response = await Order.findById(id);
        if (!response) return res.status(404).json({ message: "Order not found with provided ID" });
        return res.status(200).json(response);
      }

      if (tx_ref) {
        response = await Order.findOne({ tx_ref });
        if (!response) return res.status(404).json({ message: "Order not found with provided transaction reference" });
        return res.status(200).json(response);
      }

      if (userId) {
        response = await Order.find({ userId }).sort({ createdAt: -1 });
        if (!response || response.length === 0) return res.status(404).json({ message: "No active orders found for the provided user ID" });
        return res.status(200).json(response);
      }

      // Return all orders if no specific filters are provided
      response = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(response);
    }

    // POST Request Handling - Creating a new Order
    if (req.method === "POST") {
      const {
        firstName, lastName, email, phone,
        country, city, subCity, streetAddress,
        cartProducts, userId
      } = req.body;

      if (!cartProducts) return res.status(400).json({ error: "Cart products are required" });

      // Retrieve product info for each unique product ID in the cart
      const uniqueProductIds = [...new Set(cartProducts)];
      const productInfoList = await Product.find({ _id: { $in: uniqueProductIds } });

      // Build line items for the order
      const lineItems = uniqueProductIds.map(productId => {
        const product = productInfoList.find(p => p._id.toString() === productId);
        const quantity = cartProducts.filter(id => id === productId).length;
        return product && quantity > 0 ? {
          quantity,
          price_data: {
            currency: "ETB",
            product_data: { name: product.title },
            amount: quantity * product.price,
          }
        } : null;
      }).filter(item => item !== null); // Remove any null entries

      // Create the order
      const newOrder = await Order.create({
        line_items: lineItems,
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        subCity,
        streetAddress,
        userId,
      });
      
      return res.status(201).json(newOrder);
    }

    // PUT Request Handling - Updating an Order
    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ message: "Order ID is required" });
      
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
      
      return res.status(200).json(updatedOrder);
    }

    // DELETE Request Handling - Deleting an Order
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ message: "Order ID is required for deletion" });
      
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

      return res.status(200).json({ message: "Order deleted successfully", deletedOrder });
    }

    // If method is not allowed, respond with 405
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
