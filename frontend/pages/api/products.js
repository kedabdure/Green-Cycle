import { Product } from '../../models/Product';

import { mongooseConnect } from '../../lib/mongoose';

export default async function handler(req, res) {
  if (req.method === 'GET') {

    try {
      await mongooseConnect();
      const products = await Product.find({});
      return res.json(products);
    } catch (error) {
      res.json({ message: 'Error fetching products' }, {status: 500});
    }

  } else {
    res.json({ message: 'Method not allowed' });
  }
}
