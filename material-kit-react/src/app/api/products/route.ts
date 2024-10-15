import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';

import { mongooseConnect } from '@/lib/mongoose';

// GET request handler
export async function GET(req: Request) {
  await mongooseConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    const product = await Product.findOne({ _id: id });
    return NextResponse.json(product);
  } else {
    const products = await Product.find();
    return NextResponse.json(products);
  }
}

// POST request handler
export async function POST(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { title, description, price, images, category, properties } = body;

  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  return NextResponse.json(productDoc);
}

// PUT request handler
export async function PUT(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { title, description, price, images, category, properties, _id } = body;

  await Product.updateOne({ _id }, { title, description, price, images, category, properties });

  return NextResponse.json({ success: true });
}

// DELETE request handler
export async function DELETE(req: Request) {
  await mongooseConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    await Product.deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 });
}
