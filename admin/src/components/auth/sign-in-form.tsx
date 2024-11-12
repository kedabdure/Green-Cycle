'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';


const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      setServerError(null);

      try {
        const res = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (res?.error) {
          let errorMessage = "Check your connection and try again!";

          if (res.error.includes("Admin not found")) {
            errorMessage = "No admin account found with this email.";
          } else if (res.error.includes("Invalid password")) {
            errorMessage = "The password you entered is incorrect.";
          } else if (res.error.includes("not an admin")) {
            errorMessage = "Access denied. Only admins can sign in.";
          }

          setError('root', { type: 'server', message: errorMessage });
          setServerError(errorMessage);
        } else {
          router.push("/");
        }
      } catch (error) {
        setError('root', { type: 'server', message: "Unexpected error occurred." });
        setServerError("Unexpected error occurred. Please try again later.");
      } finally {
        setIsPending(false);
      }
    },
    [router, setError]
  );

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeIcon fontSize="large" /> : <EyeSlashIcon fontSize="large" />}
                    </IconButton>
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {serverError ? <Alert color="error">{serverError}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained" sx={{ backgroundColor: "green", "&:hover": { backgroundColor: 'darkgreen' } }}>
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
