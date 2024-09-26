import { Category } from '@/models/Category';
import { mongooseConnect } from "@/lib/mongoose"
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect()
  // const session = await getServerSession(req, res, authOptions);
  await isAdminRequest(req, res);

  // console.log(session)

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne({ _id }, {
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('ok');
  }
}
