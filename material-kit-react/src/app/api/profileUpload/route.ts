// app/api/upload-profile/route.ts
import ImageKit from "imagekit";
import formidable from "formidable";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

// Helper function to parse incoming form data using formidable
async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const { fields, files } = await parseForm(req);

    if (!files.file || !files.file[0]) {
      return NextResponse.json(
        { message: "No file uploaded. Please upload a file." },
        { status: 400 }
      );
    }
    const file = files.file[0];
    if (!fields.email || !fields.email[0]) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }
    const email = fields.email[0];

    // Check file size (2MB limit)
    if (file.size >= 2000000) {
      return NextResponse.json(
        {
          message: "The file you uploaded is too large. Please select a file smaller than 2MB.",
        },
        { status: 400 }
      );
    }

    // Read the file contents in base64 encoding
    const contents = await fs.readFile(file.filepath, { encoding: "base64" });

    // Upload the file to ImageKit
    const result = await imagekit.upload({
      file: contents,
      folder: "/ecommerce/products",
      fileName: file.originalFilename || "uploaded_file.jpg",
    });

    if (result) {
      // Generate the image URL with transformations
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "500",
            width: "500",
          },
        ],
      });

      // Connect to MongoDB and update the user profile
      await mongooseConnect();
      await Admin.findOneAndUpdate({ email }, { image: url });

      // Return a success response with the image URL
      return NextResponse.json({ message: "Upload successful!", url }, { status: 200 });
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    // Return error response
    return NextResponse.json(
      { message: "Something went wrong while uploading the image. Please try again later." },
      { status: 500 }
    );
  }
}
