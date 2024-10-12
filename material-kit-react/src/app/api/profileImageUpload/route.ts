import ImageKit from "imagekit";
import multiparty from "multiparty";
import { promises as fs } from "fs";
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

// REMOVE DEFAULT PARSE
export const config = {
  api: {
    bodyParser: false,
  },
};

// INITIALIZE IMAGEKIT WITH ENVIRONMENT VARIABLES
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

// POST method handler for Next.js 14
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "This method is not allowed. Please use POST." }, { status: 401 });
  }

  try {
    const form = new multiparty.Form();

    // PARSE FORM DATA USING MULTIPARTY
    const data: { fields: { [key: string]: any }; files: { [key: string]: any } } = await new Promise((resolve, reject) => {
      const incomingMessage = req as unknown as import("http").IncomingMessage;
      form.parse(incomingMessage, (err: any, fields: { [key: string]: any }, files: { [key: string]: any }) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file[0];
    const email = data.fields.email[0];

    // Check if the file is larger than 2MB
    if (file.size >= 2000000) {
      return NextResponse.json({ message: "The file you uploaded is too large. Please select a file smaller than 2MB." }, { status: 400 });
    }

    // Read the file contents in base64 encoding
    const contents = await fs.readFile(file.path, { encoding: "base64" });

    // Upload the file to ImageKit
    const result = await imagekit.upload({
      file: contents,
      folder: "/ecommerce/profiles",
      fileName: file.originalFilename || "uploaded_file.jpg",
    });

    if (result) {
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "120",
            width: "120",
          },
        ],
      });

      // Connect to the database and update the admin's profile image
      await mongooseConnect();
      await Admin.findOneAndUpdate({ email }, { image: url });

      return NextResponse.json({ message: "Upload successful!", url }, { status: 200 });
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    return NextResponse.json({ message: "Something went wrong while uploading the image. Please try again later!" }, { status: 500 });
  }
}
