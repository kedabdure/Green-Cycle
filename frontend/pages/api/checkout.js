import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";
import { initializePayment, chapa } from "../../lib/chapa-service";

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
    streetAddress, cartProducts, userId, paymentMethod
  } = req.body;

  const tx_ref = await chapa.genTxRef();

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

  let total = 0;
  const products = await Product.find({ _id: { $in: uniqueIds } });

  const productPrices = {};
  products.forEach(product => {
    productPrices[product._id.toString()] = product.price;
  });

  total = cartProducts.reduce((acc, productID) => {
    const price = productPrices[productID] || 0;
    return acc + price;
  }, 0);

  if (total === 0) {
    return res.status(400).json({ error: "Total price should be > 0" })
  }

  if (paymentMethod === 'card') {
    try {
      const response = await initializePayment({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        tx_ref,
        total,
      });

      // CREATE the order
      const orderDoc = await Order.create({
        line_items, firstName, lastName, email, phone, country,
        city, subCity, streetAddress, tx_ref, userId
      });

      res.status(200).json({ payment_url: response.data.checkout_url });
    } catch (error) {
      console.error("Error during payment initialization:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    const orderDoc = await Order.create({
      line_items, firstName, lastName, email, phone, country,
      city, subCity, streetAddress, tx_ref, userId
    });

    if (orderDoc) {
      const returnUrl = `${process.env.BASE_URL}/order-summary?tx_ref=${tx_ref}`;
      return res.status(201).json({ returnUrl });
    }
  }
}
