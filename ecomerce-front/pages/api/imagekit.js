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
    return res.status(405).json({ message: "Method Not Allowed" });
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

    // READ THE FILE CONTENTS IN BASE64 ENCODING
    const contents = await fs.readFile(file.path, { encoding: "base64" });


    // UPLOAD THE FILE TO IMAGEKIT
    const result = await imagekit.upload({
      file: contents,
      validateFile: (file) => file.size < 2000000,
      folder: "/ecommerce/profiles",
      fileName: file.originalFilename || "uploaded_file.jpg",
    });

    if (result) {
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "100",
            width: "100",
          },
        ],
      });

      await mongooseConnect();
      await User.findOneAndUpdate({ email }, { image: url });

      return res.status(200).json({ url });
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
