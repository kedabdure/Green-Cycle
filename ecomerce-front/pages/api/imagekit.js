import ImageKit from "imagekit";
import multiparty from "multiparty";
import { promises as fs } from "fs";
import { mongooseConnect } from "../../lib/mongoose";
import User from "../../models/User";

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

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "This method is not allowed. Please use POST." });
  }

  try {
    const form = new multiparty.Form();

    // PARSE FORM DATA
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file[0];
    const email = data.fields.email[0];

    // Check file size
    if (file.size >= 2000000) {
      return res.status(400).json({
        message: "The file you uploaded is too large. Please select a file smaller than 2MB.",
      });
    }

    // READ THE FILE CONTENTS IN BASE64 ENCODING
    const contents = await fs.readFile(file.path, { encoding: "base64" });

    // UPLOAD THE FILE TO IMAGEKIT
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

      await mongooseConnect();
      await User.findOneAndUpdate({ email }, { image: url });

      return res.status(200).json({ message: "Upload successful!", url });
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).json({ message: "Something went wrong while uploading the image. Please try again later." });
  }
};

export default handler;
