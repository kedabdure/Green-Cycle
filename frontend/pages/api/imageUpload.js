import ImageKit from 'imagekit';
import busboy from 'busboy';
import { Readable } from 'stream';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

const MAX_RETRIES = 3;

// RETRY FILE UPLOADS
async function retryUpload(fileBuffer, fileName, folder, retries = MAX_RETRIES) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const result = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder,
      });
      return result;
    } catch (error) {
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

// POST
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const bb = busboy({ headers: req.headers });
    const files = [];
    let directory = '';

    // COLLECT FILE CHUNKS AND DIRECTORY NAME FROM THE REQUEST
    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      file.on('data', (data) => chunks.push(data));

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

    // Pipe the request directly into busboy for parsing
    req.pipe(bb);

    await new Promise((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);
    });

    // VALIDATE THE REQUEST
    if (!files.length) {
      res.status(400).json({ message: 'No files found in the request.' });
      return;
    }
    if (!directory) {
      res.status(400).json({ message: 'No directory specified.' });
      return;
    }

    // UPLOAD EACH FILE TO THE SPECIFIED DIRECTORY
    const uploadPromises = files.map(({ fileBuffer, fileName }) =>
      retryUpload(fileBuffer, fileName, directory)
    );

    const uploadResults = await Promise.all(uploadPromises);

    // GENERATE and return image URLs
    const urls = uploadResults.map((result) =>
      imagekit.url({
        src: result.url,
        transformation: [{ height: '700', width: '700' }],
      })
    );

    res.status(200).json({ message: 'Upload successful!', urls });
  } catch (err) {
    console.error('Error uploading images:', err.message);
    res.status(500).json({
      message: 'Upload failed',
      error: err.message || 'Unexpected error occurred',
    });
  }
}
