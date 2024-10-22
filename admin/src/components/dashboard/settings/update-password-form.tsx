'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import bcrypt from 'bcryptjs';
import { useUser } from '@/hooks/use-user';
import { useQueryClient } from '@tanstack/react-query';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function UpdatePasswordForm(): React.JSX.Element {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { control, handleSubmit, setError, reset } = useForm<FormValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [loading, setLoading] = React.useState(false);
  const adminEmail = user?.email;

  // FETCH ADMIN'S HASHED PASSWORD
  const { data: adminData } = useQuery({
    queryKey: ['admin', adminEmail],
    queryFn: async () => {
      const { data } = await axios.get(`/api/admins?email=${adminEmail}`);
      return data;
    },
    enabled: !!adminEmail,
  });

  const onSubmit = async (formData: FormValues) => {
    setLoading(true);

    try {
      // Validate old password
      const isPasswordValid = await bcrypt.compare(formData.oldPassword, adminData.password);
      if (!isPasswordValid) {
        setError('oldPassword', { type: 'manual', message: 'Incorrect old password' });
        setLoading(false);
        return;
      }

      // Check if new password is filled
      if (!formData.newPassword) {
        setError('newPassword', { type: 'manual', message: 'New password is required' });
        setLoading(false);
        return;
      }

      // Check if confirm password is filled
      if (!formData.confirmPassword) {
        setError('confirmPassword', { type: 'manual', message: 'Please confirm your password' });
        setLoading(false);
        return;
      }

      // Check if new password matches confirm password
      if (formData.newPassword !== formData.confirmPassword) {
        setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
        setLoading(false);
        return;
      }

      // UPDATE password
      await axios.put(`/api/admins?email=${adminEmail}`, {
        password: formData.newPassword,
      });

      Swal.fire('Success', 'Password updated successfully', 'success');
      queryClient.invalidateQueries({queryKey: ['admin', adminEmail]});
      reset();
    } catch (error) {
      Swal.fire('Error', 'Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Update your password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            {/* Old Password Field */}
            <Controller
              name="oldPassword"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={Boolean(fieldState.error)}>
                  <InputLabel>Old Password</InputLabel>
                  <OutlinedInput required {...field} label="Old Password" type="password" />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </FormControl>
              )}
            />

            {/* New Password Field */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={Boolean(fieldState.error)}>
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput required {...field} label="New Password" type="password" />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </FormControl>
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={Boolean(fieldState.error)}>
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput required {...field} label="Confirm Password" type="password" />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </FormControl>
              )}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
