import multiparty from 'multiparty';
import axios from 'axios';
import fs from 'fs';
import { mongooseConnect } from '@/lib/mongoose';

export const config = {
  api: { bodyParser: false }
};

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  console.log('Number of files:', files.length);

  // get the imgur client id from the environment variables
  const imgurClientId = process.env.IMGUR_CLIENT_ID;
  const links = [];

  // upload each file to imgur
  for (const file of files.file) {
    // read the file
    const imageBuffer = fs.readFileSync(file.path)

    // upload the file to imgur using their API
    const response = await axios.post('https://api.imgur.com/3/image', imageBuffer, {
      headers: {
        'Authorization': `Client-ID ${imgurClientId}`,
        'Content-Type': 'multyipart/form-data'
      }
    });

    if (response.data.success) {
      const imgurLink = response.data.data.link;
      links.push(imgurLink);
    } else {
      console.log(res.status(500).json({ error: 'Failed to upload image' }));

      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }

  return res.json({ links });
}
