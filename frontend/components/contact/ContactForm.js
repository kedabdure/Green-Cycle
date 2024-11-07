import React, { useState } from 'react';
import { Grid, Typography, Box, Paper, Container, TextField, Alert, Button, CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import Map from '../map/MyMap';
import { PhoneCall } from 'phosphor-react';


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

        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;

        const templateParams = {
          recipient_name: 'Nexa Addis',
          from_email: formValues.email,
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          phone_number: formValues.phone,
          message: formValues.message,
        };

        // Sending the email
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setFormValues(initialValues);

        // Display success message
        Swal.fire({
          title: 'Good job!',
          text: 'Thank you for reaching out! We will contact you soon.',
          icon: 'success',
          confirmButtonColor: '#fb8122',
          background: '#f7f7f7',
        });

        console.log('Email successfully sent:', response);
      } catch (error) {
        console.error('Error occurred while submitting the form:', error);

        // Display error message
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong, please try again later.',
          icon: 'error',
          confirmButtonColor: '#fb8122',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  return (
    <Box sx={{ backgroundColor: '#fff', p: {xs: "6rem 0 1rem 0", md: "8rem 0"}, position: 'relative' }}>
      <Container>
        <Grid container spacing={4}>
          {/* Left Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: { xs: '500px', md: '600px' },
                height: { xs: '300px', md: '500px' },
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


          {/* Right Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, my: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: '900', color: '#1c2229' }}
              >
                Let's get <span style={{ color: '#48cb66' }}>in touch!</span>
              </Typography>
            </Box>

            <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name*"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formValues.firstName}
                  onChange={handleChange}
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                />
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
        </Grid>

        <Grid container spacing={4} alignItems="center">

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                my: {xs: 5, md: 0},
                px: { xs: 3, md: 5 },
                py: { xs: "3rem", md: 5 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#ffffff',
                lineHeight: 1.8,
              }}
            >
              <PhoneCall size={68} color="#111" weight="bold" />
              <Typography
                variant="h4"
                color="#111"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' },
                  my: 1,
                  textAlign: 'center',
                }}
              >
                Call Us Directly!
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 3,
                  }}
                >
                  We’re here to help with any questions about buying, selling, or reusing furniture and wood materials. Our team is ready to assist you every step of the way for a smooth and rewarding experience.
                </Typography>

                <Typography
                  variant="h6"
                  color="green"
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' },
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                >
                  +251-953-431-572
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={6}>
            <Box sx={{ my: 7, px: { xs: 1, md: 2 } }}>
              <Typography
                variant="h4"
                color="#111"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.6rem', sm: '1.75rem', md: '2rem' },
                  mb: 2,
                  textAlign: 'left',
                }}
              >
                Or Visit Us at Our Office
              </Typography>
              <Box sx={{ textAlign: { xs: 'left', md: 'left' }, mb: 3 }}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  <strong>Office Address:</strong> Garment, Addis Ababa
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  <strong>Email:</strong> info@greencycle.com
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 3,
                    fontWeight: 500,
                  }}
                >
                  <strong>Phone:</strong> +251-953-431-572
                </Typography>
              </Box>
              <Box sx={{ mt: 1, borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Map />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUsSection;
