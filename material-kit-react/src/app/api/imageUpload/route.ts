import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import busboy from 'busboy';
import { Readable } from 'stream';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

interface ImageKitUploadResponse {
  url: string;
  fileId: string;
}

const MAX_RETRIES = 3;

// Function to retry file uploads in case of failure
async function retryUpload(
  fileBuffer: Buffer,
  fileName: string,
  folder: string,
  retries = MAX_RETRIES
): Promise<ImageKitUploadResponse> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const result = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder,
      });
      return result;
    } catch (error: any) {
      attempt++;
      if (attempt >= retries) {
        console.error(`Error: ${error.message}`);
        throw new Error(`Failed to upload after ${attempt} attempts: ${error.message}`);
      }
      console.log(`Retrying upload (${attempt}/${retries}) for file: ${fileName}`);
    }
  }
  throw new Error('Unexpected error: upload failed after retries.');
}

// POST handler to process image upload
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const headers = Object.fromEntries(req.headers.entries());
    const bb = busboy({ headers });

    const files: { fileBuffer: Buffer; fileName: string; mimeType: string }[] = [];
    let directory = '';

    // Collect file chunks and directory name from the request
    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const chunks: Buffer[] = [];
      file.on('data', (data: Buffer) => chunks.push(data));

      file.on('close', () => {
        files.push({
          fileBuffer: Buffer.concat(chunks),
          fileName: filename,
          mimeType,
        });
      });
    });

    bb.on('field', (name, val) => {
      if (name === 'directory') {
        directory = val;
      }
    });

    const readableStream = Readable.from(req.body as any);

    // Wait for file processing completion
    await new Promise<void>((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);
      readableStream.pipe(bb);
    });

    // Validate the request
    if (!files.length) {
      return NextResponse.json({ message: 'No files found in the request.' }, { status: 400 });
    }
    if (!directory) {
      return NextResponse.json({ message: 'No directory specified.' }, { status: 400 });
    }

    // Upload each file to the specified directory in ImageKit
    const uploadPromises = files.map(({ fileBuffer, fileName }) =>
      retryUpload(fileBuffer, fileName, directory)
    );

    const uploadResults: ImageKitUploadResponse[] = await Promise.all(uploadPromises);

    // Generate and return image URLs with transformations
    const urls = uploadResults.map(result =>
      imagekit.url({
        src: result.url,
        transformation: [
          {
            height: '700',
            width: '700',
          },
        ],
      })
    );

    return NextResponse.json({ message: 'Upload successful!', urls }, { status: 200 });
  } catch (err: any) {
    console.error('Error uploading images:', err.message);
    return NextResponse.json(
      { message: 'Upload failed', error: err.message || 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
