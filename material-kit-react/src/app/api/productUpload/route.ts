import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import busboy from 'busboy';
import { Readable } from 'stream';


// INITIALIZE IMAGEKIT
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});


interface ImageKitUploadResponse {
  url: string;
  fileId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    // CREATE a new BUSBOY instance to `parse form data`
    const headers = Object.fromEntries(req.headers.entries());
    const bb = busboy({ headers });

    const files: { fileBuffer: Buffer; fileName: string; mimeType: string }[] = [];


    // HANDLE the 'FILE' event when files
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


    // HANDLE the 'FIELD' event if there are any FORM FIELDS
    bb.on('field', (name, val) => {
      console.log(`Field [${name}]: value: ${val}`);
    });

    // Create a READABLE STREAM and pipe it to BUSBOY
    const readableStream = Readable.from(req.body as any);
    await new Promise<void>((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);
      readableStream.pipe(bb);
    });

    // If NO FILES are found
    if (!files.length) {
      return NextResponse.json({ message: 'No files found in the request.' }, { status: 400 });
    }

    // UPLOAD ALL FILES to ImageKit CONCURRENTLY
    const uploadPromises = files.map(({ fileBuffer, fileName }) =>
      imagekit.upload({
        file: fileBuffer,
        fileName,
        folder: '/ecommerce/products',
      })
    );

    // WAIT for all file UPLOADS TO FINISH
    const uploadResults: ImageKitUploadResponse[] = await Promise.all(uploadPromises);

    // GENERATE URLs with transformations for each uploaded file
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
  } catch (err) {
    console.error('Error uploading images:', err);
    return NextResponse.json({ message: 'Upload failed', error: (err as Error).message }, { status: 500 });
  }
}
