import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    if (email) {
      const userDoc = await User.findOne({ email });
      if (userDoc) {
        return NextResponse.json(userDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    } else {
      const userDocs = await User.find();
      if (userDocs.length > 0) {
        return NextResponse.json(userDocs, { status: 200 });
      } else {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// POST Request: Create a new user
export async function POST(req: Request) {
  await mongooseConnect();

  try {
    const data = await req.json();
    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// PUT Request: Update an existing user by email
export async function PUT(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const updatedUser = await User.findOneAndUpdate({ email }, data, { new: true });
    if (updatedUser) {
      return NextResponse.json(updatedUser, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

// DELETE Request: Delete a user by email
export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (deletedUser) {
      return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
