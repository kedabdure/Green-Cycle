import Admin from "@/models/Admin";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await mongooseConnect();

    const { firstName, lastName, email, phone, city, country, image } = await req.json();

    const adminDoc = await Admin.updateMany(
      { email },
      {
        name: `${firstName} ${lastName}`,
        phone: phone,
        city: city,
        country: country,
        image: image,
      }
    );

    if (!adminDoc) {
      return NextResponse.json({ message: "Update failed!" }, { status: 500 });
    }

    return NextResponse.json(adminDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: (error as Error).message }, { status: 500 });
  }
}
