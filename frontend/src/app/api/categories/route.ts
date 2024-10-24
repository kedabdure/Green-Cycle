// app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';

// Define the API route handler
export async function GET() {
  await mongooseConnect();
  const categories = await Category.find().populate('parent');
  return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: Request) {
  await mongooseConnect();
  const { name, parentCategory, properties } = await request.json();

  const categoryDoc = await Category.create({
    name,
    parent: parentCategory || undefined,
    properties,
  });

  return NextResponse.json(categoryDoc, { status: 201 });
}

// UPDATE category
export async function PUT(request: Request) {
  await mongooseConnect();
  const { name, parentCategory, properties } = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const categoryDoc = await Category.updateOne({ _id: id }, {
    name,
    parent: parentCategory || undefined,
    properties,
  });

  return NextResponse.json(categoryDoc, { status: 200 });
}

export async function DELETE(request: Request) {
  await mongooseConnect();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get('_id');

  await Category.deleteOne({ _id });
  return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
}
