import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export default async function GET(req: any) {
  await mongooseConnect();

  const { email } = req.query;

  if (email) {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      return NextResponse.json(userDoc, {status: 200});
    } else {
      return NextResponse.json({ message: "User not found" }, {status: 404});
    }
  } else {
    const userDocs = await User.find();

    if(userDocs){
      return NextResponse.json(userDocs, {status: 200});
    } else {
      return NextResponse.json({ message: "No users found" }, {status: 404});
    }
  }
}
