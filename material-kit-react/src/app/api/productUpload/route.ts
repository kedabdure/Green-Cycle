import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import busboy from 'busboy';
import { Readable } from 'stream';

// Disable Next.js's default body parsing to use Busboy for multipart handling
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

// TypeScript Interface for ImageKit Response
interface ImageKitUploadResponse {
  url: string;
  fileId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // If the request is not a POST method, return a 405 error
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    // Create a new Busboy instance to parse form data
    const headers = Object.fromEntries(req.headers.entries());
    const bb = busboy({ headers });

    let fileBuffer: Buffer | null = null;
    let fileName: string = '';
    let mimeType: string = '';

    // Handle the 'file' event when a file is found in the form
    bb.on('file', (name, file, info) => {
      const { filename, mimeType: fileMimeType } = info;
      fileName = filename;
      mimeType = fileMimeType;

      // Collect the file content in chunks to form a buffer
      const chunks: Buffer[] = [];
      file.on('data', (data: Buffer) => {
        chunks.push(data);
      });

      file.on('close', () => {
        // Concatenate all the chunks into a single buffer
        fileBuffer = Buffer.concat(chunks);
      });
    });

    bb.on('field', (name, val) => {
      console.log(`Field [${name}]: value: ${val}`);
    });

    // Handle the end of the form processing
    const bbPromise = new Promise<void>((resolve, reject) => {
      bb.on('close', () => {
        resolve();
      });

      bb.on('error', (err) => {
        reject(err);
      });

      // Convert Next.js's ReadableStream into Node's Readable stream
      const readableStream = Readable.from(req.body as any);
      readableStream.pipe(bb);
    });

    await bbPromise;

    // Check if fileBuffer is populated
    if (fileBuffer) {
      // Upload the file to ImageKit
      const result: ImageKitUploadResponse = await imagekit.upload({
        file: fileBuffer, // Pass the binary buffer
        fileName, // Original file name
        folder: '/ecommerce/products', // Specify your folder in ImageKit
      });

      // Generate a URL with transformation options (resize, etc.)
      const url = imagekit.url({
        src: result.url,
        transformation: [
          {
            height: "500",
            width: "500",
          },
        ],
      });

      // Return the URL of the uploaded file
      return NextResponse.json({ message: 'Upload successful!', url }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No file found in the request.' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error uploading image:', err);
    return NextResponse.json({ message: 'Upload failed', error: (err as Error).message }, { status: 500 });
  }
}
