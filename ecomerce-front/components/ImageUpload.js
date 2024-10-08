import React, { useState } from 'react';
import ImageKit from 'imagekitio-next';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
    formData.append('fileName', file.name);

    const response = await fetch('/api/imagekit');
    const authParams = await response.json();

    formData.append('signature', authParams.signature);
    formData.append('token', authParams.token);
    formData.append('expire', authParams.expire);

    const uploadResponse = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData);

    const uploadResult = uploadResponse.data;
    setImageUrl(uploadResult.url);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
