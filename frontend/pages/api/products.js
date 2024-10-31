import { Product } from '../../models/Product';
import { mongooseConnect } from '../../lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === 'GET') {
    const { id, category } = req.query;

    try {
      if (id) {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(product);
      }

      if (category) {
        const relatedProducts = await Product.find({ category });
        return res.json(relatedProducts);
      }

      const products = await Product.find();
      return res.json(products);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Error fetching products' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
