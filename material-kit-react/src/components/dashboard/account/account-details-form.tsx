'use client';

import * as React from 'react';
import { z } from 'zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { X } from "@phosphor-icons/react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { useUser } from '@/hooks/use-user';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

// Zod schema for validation
const accountDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = z.infer<typeof accountDetailsSchema>;

export function AccountDetailsForm(): React.JSX.Element {
  const { user, updateUser, adminInfo } = useUser();
  const [snackbarState, setSnackbarState] = useState<{ open: boolean; message: string; severity: 'error' | 'warning' | 'info' | 'success' | undefined }>({ open: false, message: "", severity: undefined });
  const queryClient = useQueryClient();

  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});

  // Update formData whenever adminInfo changes
  useEffect(() => {
    if (adminInfo) {
      setFormData((prev) => ({
        ...prev,
        phone: adminInfo.phone || '',
        city: adminInfo.city || '',
        country: adminInfo.country || '',
      }));
    }
  }, [adminInfo]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    // VALIDATE
    const result = accountDetailsSchema.safeParse(formData);

    if (!result.success) {
      const formErrors = result.error.formErrors.fieldErrors;
      setIsUpdating(false);
      setErrors(
        Object.fromEntries(
          Object.entries(formErrors).map(([key, value]) => [key, value?.[0]])
        ) as Partial<FormValues>
      );
      return;
    }

    setErrors({});

    try {
      const response = await axios.put(`/api/admins?email=${formData.email}`, formData);
      if (response.status !== 200) {
        setIsUpdating(false);
        setSnackbarState({
          severity: "error",
          message: "Failed to update profile!",
          open: true,
        });
        throw new Error('Failed to update profile');
      }
      setIsUpdating(false);
      setSnackbarState({
        severity: "success",
        message: "Profile updated successfully!",
        open: true,
      });
      queryClient.invalidateQueries({queryKey: ['admin']});
      // if (updateUser) {
      //   await updateUser(formData);
      // }
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUpdating(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbarState({ open: false, message: "", severity: undefined });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Stack padding="0" marginTop="0" spacing={2}>
          <Snackbar
            open={snackbarState.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarState.severity}
              sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}
              variant="filled"
              action={
                <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                  <X size={24} />
                </IconButton>
              }
            >
              {snackbarState.message}
            </Alert>
          </Snackbar>
        </Stack>

        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.name)}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={formData.name}
                  onChange={handleInputChange}
                  label="First name"
                  name="name"
                  error={Boolean(errors.name)}
                />
                {errors.name && <p>{errors.name}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email address"
                  name="email"
                  disabled
                  error={Boolean(errors.email)}
                />
                {errors.email && <p>{errors.email}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  label="Phone number"
                  name="phone"
                  type="tel"
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  label="City"
                  name="city"
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <OutlinedInput
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  label="Country"
                  name="country"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={isUpdating}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
