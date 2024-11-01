import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";


export default async function handler(req, res) {
  await mongooseConnect();
  const { id, tx_ref, userId } = req.query;

  try {
    if (req.method === "GET") {
      let response;

      if (id) {
        response = await Order.findOne({ _id: id });
        if (!response) {
          return res.status(404).json({ message: "Order not found with provided ID" });
        }
        return res.status(200).json(response);
      }

      if (tx_ref) {
        response = await Order.findOne({ tx_ref });
        if (!response) {
          return res.status(404).json({ message: "Order not found with provided transaction reference" });
        }
        return res.status(200).json(response);
      }

      if (userId) {
        response = await Order.find({ userId, status: { $ne: "Delivered" } }).sort({ createdAt: -1 });
        if (!response || response.length === 0) {
          return res.status(404).json({ message: "No active orders found for the provided user ID" });
        }
        return res.status(200).json(response);
      }

      response = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(response);
    }


    // POST
    if (req.method === "POST") {
      const {
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        subCity,
        streetAddress,
        cartProducts,
        userId,
      } = req.body;

      if (!cartProducts) {
        return res.status(400).json({ error: "Cart products are required" });
      }

      const productsIds = cartProducts;
      const uniqueIds = [...new Set(productsIds)];
      const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

      let line_items = [];

      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            quantity,
            price_data: {
              currency: "ETB",
              product_data: { name: productInfo.title },
              amount: quantity * productInfo.price,
            },
          });
        }
      }

      // Create the order document in MongoDB
      const orderDoc = await Order.create({
        line_items,
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

      return res.status(201).json(orderDoc);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    // UPDATE
    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ message: "Order ID is required for updating" });
      const updatedOrder = await updateOrderById(id, req.body);
      return res.status(200).json(updatedOrder);
    }

    // DELETE
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ message: "Order ID is required for deletion" });
      const response = await deleteOrderById(id);
      return res.status(200).json(response);
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });

  } catch (error) {
    res.status(error.message === "Order not found" ? 404 : 500).json({ error: error.message });
  }
}
