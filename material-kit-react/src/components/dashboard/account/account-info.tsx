'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/hooks/use-user';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export function AccountInfo(): React.JSX.Element {
  const { adminInfo } = useUser();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      if (!adminInfo) {
        return null;
      }
      const res = await axios.get(`/api/admins?email=${adminInfo.email}`);
      return res.data;
    }
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', '/ecommerce/profile');

      try {
        setLoading(true);
        const response = await axios.post('/api/imageUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          const postData = await axios.put(`/api/admins?email=${data?.email}`, { image: response.data.urls[0] });
          if (postData.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Image uploaded successfully',
              confirmButtonText: 'Ok',
            });

              queryClient.invalidateQueries({ queryKey: ['admin'] });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Image upload failed',
              confirmButtonText: 'Ok',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Image upload failed',
            confirmButtonText: 'Ok',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Image upload failed. Please try again later.',
          confirmButtonText: 'Ok',
        });
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={data?.image} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{data?.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {data?.city}, {data?.country}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" component="label">
          {loading ? 'Uploading...' : 'Upload picture'}
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </CardActions>
    </Card>
  );
}
