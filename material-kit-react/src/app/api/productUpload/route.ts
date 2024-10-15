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

    const files: { fileBuffer: Buffer; fileName: string; mimeType: string }[] = [];

    // Handle the 'file' event when files are found in the form
    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;

      const chunks: Buffer[] = [];
      file.on('data', (data: Buffer) => {
        chunks.push(data);
      });

      file.on('close', () => {
        files.push({
          fileBuffer: Buffer.concat(chunks),
          fileName: filename,
          mimeType,
        });
      });
    });

    // Handle the 'field' event if there are any form fields
    bb.on('field', (name, val) => {
      console.log(`Field [${name}]: value: ${val}`);
    });

    // Handle the end of the form processing
    const bbPromise = new Promise<void>((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);

      const readableStream = Readable.from(req.body as any);
      readableStream.pipe(bb);
    });

    await bbPromise;

    // If no files are found in the request, return a 400 error
    if (!files.length) {
      return NextResponse.json({ message: 'No files found in the request.' }, { status: 400 });
    }

    // Upload all files to ImageKit concurrently
    const uploadPromises = files.map(({ fileBuffer, fileName }) =>
      imagekit.upload({
        file: fileBuffer,
        fileName, // Use the original file name
        folder: '/ecommerce/products', // Specify your folder in ImageKit
      })
    );

    // Wait for all file uploads to finish
    const uploadResults: ImageKitUploadResponse[] = await Promise.all(uploadPromises);

    // Generate URLs with transformations for each uploaded file
    const urls = uploadResults.map(result =>
      imagekit.url({
        src: result.url,
        transformation: [
          {
            height: '500',
            width: '500',
          },
        ],
      })
    );

    console.log("urls", urls);

    // Return the URLs of the uploaded files
    return NextResponse.json({ message: 'Upload successful!', urls }, { status: 200 });
  } catch (err) {
    console.error('Error uploading images:', err);
    return NextResponse.json({ message: 'Upload failed', error: (err as Error).message }, { status: 500 });
  }
}
