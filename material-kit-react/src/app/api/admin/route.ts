import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';

import { mongooseConnect } from '@/lib/mongoose';

export async function PUT(req: Request) {
  try {
    await mongooseConnect();

    const { firstName, lastName, email, phone, city, country, image, role } = await req.json();

    const adminDoc = await Admin.updateMany(
      { email },
      {
        name: `${firstName} ${lastName}`,
        phone: phone,
        city: city,
        country: country,
        image: image,
        role: role,
      }
    );

    if (!adminDoc) {
      return NextResponse.json({ message: 'Update failed!' }, { status: 500 });
    }

    return NextResponse.json(adminDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    await mongooseConnect();

    if (email) {
      const adminDoc = await Admin.findOne({ email });

      if (adminDoc) {
        return NextResponse.json(adminDoc, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Admin not found!' }, { status: 404 });
      }
    } else {
      const adminDocs = await Admin.find({});
      return NextResponse.json(adminDocs, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching admin info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
