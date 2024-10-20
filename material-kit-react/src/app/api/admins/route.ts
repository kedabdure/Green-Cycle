import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
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
      const adminDoc = await Admin.findOne({ email });
      if (adminDoc) {
        return NextResponse.json(adminDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found with this email' }, { status: 404 });
      }
    } else if (id) {
      const adminDoc = await Admin.findById(id);
      if (adminDoc) {
        return NextResponse.json(adminDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found with this ID' }, { status: 404 });
      }
    } else {
      const adminDocs = await Admin.find();
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
    const newAdmin = await Admin.create(data);
    if (!newAdmin) {
      return NextResponse.json({ error: 'Error creating admin' }, { status: 500 });
    } else {
      return NextResponse.json(newAdmin, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error creating admin' }, { status: 500 });
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
      const updatedAdmin = await Admin.findOneAndUpdate({ email }, data, { new: true });
      if (updatedAdmin) {
        return NextResponse.json(updatedAdmin, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
      }
    } else {
      const updatedAdmin = await Admin.findByIdAndUpdate({ _id: id }, data, { new: true });
      if (updatedAdmin) {
        return NextResponse.json(updatedAdmin, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
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
      const deletedAdmin = await Admin.findOneAndDelete({ email });
      if (deletedAdmin) {
        return NextResponse.json({ message: 'Admin deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
      }
    } else {
      const deletedAdmin = await Admin.findByIdAndDelete(id);
      if (deletedAdmin) {
        return NextResponse.json({ message: 'Admin deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
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
