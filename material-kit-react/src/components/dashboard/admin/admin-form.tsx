'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import {
  Alert, Button, Card, Checkbox, FormControl, FormControlLabel,
  FormHelperText, InputLabel, OutlinedInput, Stack, Typography
} from '@mui/material';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().email().min(1, { message: 'Email is required' }),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  role: zod.boolean(),
});

type FormValues = zod.infer<typeof schema>;

const defaultValues: FormValues = { name: '', email: '', password: '', role: false };

export default function AdminForm(): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // SUBMIT THE FORM
  const onSubmit = useCallback(async (values: FormValues) => {
    setIsPending(true);

    const payload = {
      ...values,
      role: values.role ? 'super_admin' : 'admin',
    };

    try {
      const createAdminResponse = await fetch('/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await createAdminResponse.json();

      if (createAdminResponse.status === 200 && result.message === 'Admin with this email already exists') {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'User with this email already exists!',
        });
        return;
      }

      if (createAdminResponse.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Admin created successfully',
          confirmButtonText: 'Ok',
        }).then(() => {
          queryClient.invalidateQueries({ queryKey: ['admin'] });
          router.push('/dashboard/admins');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while creating the admin!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    } finally {
      setIsPending(false);
    }
  }, [queryClient, router]);


  return (
    <Stack spacing={3}>
      <Typography variant="h4">Admin Form</Typography>
      <Card sx={{
        padding: "50px 30px",
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.name)} fullWidth>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput {...field} label="Name" />
                  {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)} fullWidth>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput {...field} label="Email" type="email" />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)} fullWidth>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput {...field} label="Password" type="password" />
                  {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                      />
                    }
                    label="Make this user a Super Admin"
                  />
                </FormControl>
              )}
            />
            {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
