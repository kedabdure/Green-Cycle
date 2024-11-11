import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import Map from '../map/MyMap';
import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function NewsLetter() {
  const [formData, setFormData] = React.useState({ email: '' });
  const [formError, setFormError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const validate = (values) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let error = '';

    if (!values.email) {
      error = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      error = 'Invalid email format!';
    }

    setFormError(error);
    return error === '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate(formData)) {
      try {
        const res = await axios.post('/api/newsletter', formData);
        
        if (res.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully subscribed to our newsletter!',
            confirmButtonColor: 'green',
          });
          setFormData({ email: '' });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error;
        
        if (errorMessage === "Email already subscribed") {
          Swal.fire({
            icon: 'info',
            title: 'Already Subscribed',
            text: 'This email is already subscribed to our newsletter.',
            confirmButtonColor: 'green',
          });
        } else if (errorMessage === "Email is required") {
          Swal.fire({
            icon: 'error',
            title: 'Missing Email',
            text: 'Please provide an email address to subscribe.',
            confirmButtonColor: 'green',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
            confirmButtonColor: 'green',
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        py: { xs: '3rem', md: '3rem' },
        px: { xs: '1rem', md: '5rem' },
        width: '100%',
        height: '500px',
        gap: { xs: '2rem', md: '3rem' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '45%' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '1.3rem', md: '2rem' }, fontWeight: '700' }}>
          Subscribe To Our Newsletter
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, mt: 1 }}>
          Stay updated with our latest company news, insights, and exclusive updates directly to your inbox.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mt: 4,
          }}
        >
          <TextField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Enter your email"
            variant="outlined"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                height: '55px',
                borderRadius: '16px 0 0 16px',
              },
              '& .MuiInputLabel-root': {
                color: formError ? '#f44336' : 'inherit',
              },
            }}
            error={!!formError}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              px: 3,
              height: '55px',
              backgroundColor: '#111',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' },
              borderRadius: '0 16px 16px 0',
              textTransform: 'none',
            }}
          >
            {isSubmitting ? <CircularProgress color="inherit" size={24} /> : 'Subscribe'}
          </Button>
        </Box>
        {formError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formError}
          </Alert>
        )}
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '55%' },
          height: { xs: '250px', sm: '300px', md: '350px' },
          overflow: 'hidden',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Map />
      </Box>
    </Box>
  );
}
