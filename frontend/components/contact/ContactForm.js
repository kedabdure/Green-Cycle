import React, { useState } from 'react';
import { Grid, Box, Container, TextField, Alert, Button, CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { sendEmail } from '../../lib/sendEmail';


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

const ContactUsSection = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false)


  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const internationalPhoneRegex = /^\+2519\d{8}$/;

    if (!values.firstName) {
      errors.firstName = 'First name is required!';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email format!';
    }
    if (!values.message) {
      errors.message = 'Message is required!';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required!';
    } else if (!internationalPhoneRegex.test(values.phone)) {
      errors.phone = 'Invalid phone number format (+251)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (formErrors[name]) formErrors[name] = '';
  };

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phone: value });
    if (formErrors.phone) formErrors.phone = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(formValues);

    if (isValid) {
      try {
        setIsSubmitting(true);

        const templateParams = {
          recipient_name: 'Green Cycle',
          from_email: formValues.email,
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          phone_number: formValues.phone,
          message: formValues.message,
        };

        const res = await sendEmail(templateParams);

        if (res) {
          setFormValues(initialValues);

          Swal.fire({
            title: 'Good job!',
            text: 'Thank you for reaching out! We will contact you soon.',
            icon: 'success',
            confirmButtonColor: '#00ca00',
            background: '#f7f7f7',
          });

          console.log('Email successfully sent');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong, please try again later.',
            icon: 'error',
            confirmButtonColor: '#00ca00',
          });
        }
      } catch (error) {
        console.error('Error occurred while submitting the form:', error);

        Swal.fire({
          title: 'Error!',
          text: 'Oops! Something went wrong, please try again later.',
          icon: 'error',
          confirmButtonColor: '#48cb66',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        position: 'relative',
        px: { xs: '1rem', md: '3rem', lg: '5rem' },
        py: { xs: '1rem', md: '2rem', lg: '2rem' },

      }}
    >
      {/* Form */}
      <Grid container sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name*"
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                // size="small"
                fullWidth
                InputLabelProps={{ sx: { color: '#3a3f45' } }}
                InputProps={{
                  sx: {
                    '&::placeholder': { color: '#a0a0a0' },
                    '&.Mui-focused fieldset': { borderColor: '#fb8122' },
                  },
                }}
              />
              {formErrors.firstName && (
                <Alert severity="error" sx={{ mt: 1, p: 0, backgroundColor: 'transparent', color: '#f44336' }}>
                  {formErrors.firstName}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name*"
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                // size="small"
                fullWidth
                InputLabelProps={{ sx: { color: '#3a3f45' } }}
                InputProps={{
                  sx: {
                    '&::placeholder': { color: '#a0a0a0' },
                    '&.Mui-focused fieldset': { borderColor: '#fb8122' },
                  },
                }}
              />
              {formErrors.lastName && (
                <Alert severity="error" sx={{ mt: 1, p: 0, backgroundColor: 'transparent', color: '#f44336' }}>
                  {formErrors.lastName}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email*"
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formValues.email}
                onChange={handleChange}
                // size="small"
                fullWidth
                InputLabelProps={{ sx: { color: '#3a3f45' } }}
                InputProps={{
                  sx: {
                    '&::placeholder': { color: '#a0a0a0' },
                    '&.Mui-focused fieldset': { borderColor: '#fb8122' },
                  },
                }}
              />
              {formErrors.email && (
                <Alert severity="error" sx={{ mt: 1, p: 0, backgroundColor: 'transparent', color: '#f44336' }}>
                  {formErrors.email}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <PhoneInput
                id="phone"
                name="phone"
                label="Phone Number*"
                placeholder="Enter phone number"
                onChange={handlePhoneChange}
                defaultCountry="ET"
                international
                countryCallingCodeEditable={false}
                value={formValues.phone}
                style={{
                  height: '55px',
                }}
              />
              {formErrors.phone && (
                <Alert severity="error" sx={{ mt: 1, p: 0, backgroundColor: 'transparent', color: '#f44336' }}>
                  {formErrors.phone}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="message"
                label="Describe your project..."
                multiline
                minRows={4}
                sx={{ width: '100%' }}
                name="message"
                placeholder="my project is about..."
                value={formValues.message}
                onChange={handleChange}
              />
              {formErrors.message && (
                <Alert severity="error" sx={{ mt: 1, p: 0, backgroundColor: 'transparent', color: '#f44336' }}>
                  {formErrors.message}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: { xs: 'left', md: 'left' } }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1,
                  px: 4,
                  backgroundColor: '#111',
                  '&:hover': { backgroundColor: '#333' },
                  borderRadius: '5px',
                  textTransform: 'none',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Image*/}
        <Grid item xs={12} md={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: '450px', md: '500px' },
              height: { xs: '450px', md: '400px' },
            }}
          >
            <Image
              fill
              blurDataURL="/assets/images/contact-storyset.svg"
              placeholder="blur"
              src="/assets/images/contact-storyset.svg"
              alt="contact image"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsSection;
