import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcrypt';

import { mongooseConnect } from '@/lib/mongoose';

// GET request
export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const id = searchParams.get('id');

  try {
    if (email) {
      const adminDoc = await User.findOne({ email });
      if (adminDoc) {
        return NextResponse.json(adminDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found with this email' }, { status: 404 });
      }
    } else if (id) {
      const adminDoc = await User.findById({ _id: id });
      if (adminDoc) {
        return NextResponse.json(adminDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found with this ID' }, { status: 404 });
      }
    } else {
      const adminDocs = await User.find().sort({ createdAt: -1 });
      if (adminDocs.length > 0) {
        return NextResponse.json(adminDocs, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No admins found' }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching admins' }, { status: 500 });
  }
}

// POST Request: Create a new admin
export async function POST(req: Request) {
  await mongooseConnect();

  try {
    const data = await req.json();

    const { email } = data;

    // Check if admin already exists
    const admin = await User.findOne({ email });
    if (admin) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 200 });
    }

    // CREATE new admin
    const newAdmin = await User.create(data);
    if (!newAdmin) {
      return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created successfully', admin: newAdmin }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Server error, unable to create admin' }, { status: 500 });
  }
}

// PUT Request: Update an existing admin by email
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const id = searchParams.get('id');

  if (!email && !id) {
    return NextResponse.json({ error: 'Email or ID is required' }, { status: 400 });
  }
  try {
    const data = await req.json();
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    await mongooseConnect();

    if (email) {
      const updatedAdmin = await User.findOneAndUpdate({ email }, data, { new: true });
      if (updatedAdmin) {
        return NextResponse.json(updatedAdmin, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    } else {
      const updatedAdmin = await User.findByIdAndUpdate({ _id: id }, data, { new: true });
      if (updatedAdmin) {
        return NextResponse.json(updatedAdmin, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error updating admin' }, { status: 500 });
  }
}

// DELETE Request: Delete an admin by email
export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const id = searchParams.get('id');

  if (!email && !id) {
    return NextResponse.json({ error: 'Email or ID is required' }, { status: 400 });
  }

  try {
    if (email) {
      const deletedAdmin = await User.findOneAndDelete({ email });
      if (deletedAdmin) {
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    } else {
      const deletedAdmin = await User.findByIdAndDelete(id);
      if (deletedAdmin) {
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting admin' }, { status: 500 });
  }
}

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
