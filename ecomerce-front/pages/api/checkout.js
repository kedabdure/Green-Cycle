import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { initializePayment } from "@/lib/chapaService";

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

  // debugger;
  console.log(req.body);

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

  // Create the order document in MongoDB
  const orderDoc = await Order.create({
    line_items, firstName, lastName, email, phone, country,
    city, subCity, wereda, streetAddress, paid: false,
  });

  try {
    const response = await initializePayment({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      amount: line_items.reduce((acc, item) => acc + item.price_data.amount, 0),
    });

    // Log the response for debugging
    console.log("Chapa Response:", response.data);

    // Return the checkout URL only
    res.status(200).json({ payment_url: response.data.checkout_url });
  } catch (error) {
    // Log the error for more insight
    console.error("Error during payment initialization:", error.message);
    res.status(500).json({ error: error.message });
  }

}
