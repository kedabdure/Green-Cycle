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
    const products = await Product.find().sort({ updatedAt: -1 });
    return NextResponse.json(products);
  }
}

// POST request handler
export async function POST(req: Request) {
  await mongooseConnect();

  const body = await req.json();
  const { title, description, price, images, panoramicImages, category, properties } = body;

  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
    panoramicImages,
    category,
    properties,
  });

  return NextResponse.json(productDoc, { status: 201 });
}

// PUT request handler
export async function PUT(req: Request) {
  await mongooseConnect();

  const url = new URL(req.url);
  const _id = url.searchParams.get('id');

  const body = await req.json();
  const { title, description, price, images, panoramicImages, category, properties } = body;

  await Product.updateOne({ _id }, { title, description, price, images, panoramicImages, category, properties });

  return NextResponse.json({ status: 200 });
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
