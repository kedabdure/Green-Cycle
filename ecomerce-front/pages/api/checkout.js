import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'should be a POST request' });
    return;
  }

  if (!req.body) {
    res.status(400).json({ error: 'Missing request body' });
    return;
  }

  const {
    firstName, lastName, email,
    phone, country, city, subCity,
    wereda, streetAddress, cartProducts,
  } = req.body;

  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'ETB',
          product_data: { name: productInfo.title },
          amount: quantity * productInfo.price,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items, firstName, lastName, email, phone, country,
    city, subCity, wereda, streetAddress, paid: false,
  });

  // Send the response back with the order document
  res.status(201).json({ success: true, order: orderDoc });
}
