import React, { useState } from 'react';
import { Grid, Typography, Box, Paper, Container, TextField, Alert, Button, CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Map from '../map/MyMap';
import { sendEmail } from '../../lib/sendEmail';
import { PhoneCall } from 'phosphor-react';
import { Phone, MapPin, Envelope } from "phosphor-react";


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
            confirmButtonColor: '#fb8122',
            background: '#f7f7f7',
          });

          console.log('Email successfully sent');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong, please try again later.',
            icon: 'error',
            confirmButtonColor: '#48cb66',
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
    <Box sx={{ backgroundColor: '#fff', p: { xs: "6rem 0 1rem 0", md: "8rem 0 5rem 0" }, position: 'relative' }}>
      <Container>
        <Grid container spacing={4}>
          {/* Left Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: { xs: '500px', md: '600px' },
                height: { xs: '400px', md: '500px' },
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
        </Grid>

        <Grid container spacing={{ xs: 2, sm: 4 }} alignItems="center">
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: 4, md: 0 },
                px: { xs: 3, md: 4 },
                py: { xs: 2, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#ffffff",
                textAlign: "center",
              }}
            >
              <Phone size={68} color="green" />
              <Typography
                variant="h4"
                color="#111"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.4rem", sm: "1.8rem", md: "1.9rem" },
                  mt: 1,
                }}
              >
                Contact Us!
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  m: '1rem 0 2rem 0',
                  px: { xs: 1, sm: 3 },
                  maxWidth: { xs: "100%", sm: "80%" },
                  fontWeight: "600",
                }}
              >
                Have questions? Reach out, and we’ll be happy to assist.
              </Typography>

              <Box sx={{ textAlign: "left", width: {xs: "80%", md: "40%"} }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    mb: 2,
                  }}
                >
                  <MapPin size={24} color="#111" weight="fill" style={{ marginRight: 8 }} />
                  <Typography variant="body1" color="textSecondary">
                    Garment, Addis Ababa
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    mb: 2,
                  }}
                >
                  <Envelope size={24} color="#111" weight="fill" style={{ marginRight: 8 }} />
                  <Typography variant="body1" color="textSecondary">
                    info@greencycle.com
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    mb: 3,
                  }}
                >
                  <Phone size={24} color="#111" weight="fill" style={{ marginRight: 8 }} />
                  <Typography variant="body1" color="textSecondary">
                    +251-953-431-572
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                my: { xs: 1, sm: 6, md: 7 },
                px: { xs: 1, md: 2 },
              }}
            >
              <Box
                sx={{
                  mt: 1,
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  height: { xs: 200, sm: 300, md: 400 },
                }}
              >
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
