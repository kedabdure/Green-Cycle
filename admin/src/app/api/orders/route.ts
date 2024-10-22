import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

// Create an order (POST)
export async function POST(req: Request) {
  try {
    await mongooseConnect();
    const data = await req.json(); // Get the order data from the request body

    const newOrder = await Order.create(data); // Create a new order in MongoDB

    return NextResponse.json(newOrder, { status: 201 }); // Return the created order with status 201 (Created)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Get all orders or a specific order by ID (GET)
export async function GET(req: Request) {
  try {
    await mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Check if a specific order ID is requested

    if (id) {
      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
      }
      return NextResponse.json(order, { status: 200 });
    } else {
      const orders = await Order.find(); // Fetch all orders
      return NextResponse.json(orders, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// UPDATE AN ORDER BY ID (PUT)
export async function PUT(req: Request) {
  try {
    await mongooseConnect();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const data = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Delete an order by ID (DELETE)
export async function DELETE(req: Request) {
  try {
    await mongooseConnect();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
