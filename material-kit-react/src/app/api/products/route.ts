import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

interface reqBody {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  properties: any;
}

export default async function POST(req: { type: any, body: reqBody }) {
  const { title, description, price, images, category, properties } = req.body;

  // Validate required fields
  if (!title || !category || !price || !images.length) {
    return NextResponse.json({ message: "Please fill in all required fields: Product name, category, price, and at least one image." }, { status: 400 });
  }

  // Save product to database
try {  await mongooseConnect();
  const productDocs = await Product.create({
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  if (!productDocs) {
    return NextResponse.json({ message: "Unable to save product." }, { status: 500 });
  } else {
    return NextResponse.json(productDocs, { status: 200 });
  }} catch (error) {
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  };
}
