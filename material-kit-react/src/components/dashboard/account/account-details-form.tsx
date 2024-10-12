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

// Zod schema for validation
const accountDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = z.infer<typeof accountDetailsSchema>;

export function AccountDetailsForm(): React.JSX.Element {
  const { user, updateUser } = useUser();
  const [snackbarState, setSnackbarState] = useState<{ open: boolean; message: string; severity: 'error' | 'warning' | 'info' | 'success' | undefined }>({ open: false, message: "", severity: undefined });

  const initialFormData: FormValues = {
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: typeof user?.phone === 'string' ? user.phone : '',
    city: typeof user?.city === 'string' ? user.city : '',
    country: typeof user?.country === 'string' ? user.country : '',
  };

  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState<FormValues>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

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
      setIsUpdating(false)
      setErrors(
        Object.fromEntries(
          Object.entries(formErrors).map(([key, value]) => [key, value?.[0]])
        ) as Partial<FormValues>
      );

      return;
    }

    setErrors({});

    try {
      const response = await axios.put('/api/admin', formData);
      if (response.status !== 200) {
        setIsUpdating(false)
        setSnackbarState({
          severity: "error",
          message: "Failed to update profile!",
          open: true,
        });
        throw new Error('Failed to update profile');
      }
      setIsUpdating(false)
      setSnackbarState({
        severity: "success",
        message: "Profile updated successfully!",
        open: true,
      });

      if (updateUser) {
        await updateUser(formData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUpdating(false)
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
              <FormControl fullWidth required error={Boolean(errors.firstName)}>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  value={formData.firstName}
                  onChange={handleInputChange}
                  label="First name"
                  name="firstName"
                  error={Boolean(errors.firstName)}
                />
                {errors.firstName && <p>{errors.firstName}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth error={Boolean(errors.lastName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  label="Last name"
                  name="lastName"
                />
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
