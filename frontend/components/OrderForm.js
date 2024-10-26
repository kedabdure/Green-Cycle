import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  TextField,
  Button,
  Alert,
  FormControl,
  Box,
} from '@mui/material';
import { useSession } from 'next-auth/react';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: '',
  city: '',
  subCity: '',
  wereda: '',
  streetAddress: '',
};

export default function TableOrderForm({ handleSubmit }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: session } = useSession()

  const name = session?.user?.name;
  const existingFirstName = name?.split(' ')[0];
  const existingLastName = name?.split(' ')[1];

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\+251(9|7)\d{8}$/;

    // Field validations
    if (!values.firstName) errors.firstName = 'First name is required!';
    if (!values.lastName) errors.lastName = 'Last name is required!';
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email format!';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required!';
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = 'Enter 9 or 7 after +251';
    }
    if (!values.streetAddress) errors.streetAddress = 'Street Address is required!';
    if (!values.city) errors.city = 'City is required!';
    if (!values.subCity) errors.subCity = 'Sub-City is required!';
    if (!values.wereda) errors.wereda = 'Wereda is required!';
    if (!values.country) errors.country = 'Country is required!';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phone: value });
    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  function handleSubmitForm(e) {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      setSubmitSuccess(true);
      handleSubmit({
        ...formValues,
        phone: formValues.phone.replace(/^\+251/, '0'),
      });
      setFormValues(initialValues);
    } else {
      setSubmitSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {/* First Name */}
        <FormControl fullWidth>
          <TextField
            label="First name"
            id="firstName"
            name="firstName"
            type="text"
            value={formValues.firstName}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.firstName && <Alert severity="error">{formErrors.firstName}</Alert>}
        </FormControl>

        {/* Last Name */}
        <FormControl fullWidth>
          <TextField
            label="Last name"
            id="lastName"
            name="lastName"
            type="text"
            value={formValues.lastName}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.lastName && <Alert severity="error">{formErrors.lastName}</Alert>}
        </FormControl>

        {/* Phone Number */}
        <FormControl fullWidth>
          <PhoneInput
            label="Phone Number"
            name="phone"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={handlePhoneChange}
            defaultCountry="ET"
            international
            countryCallingCodeEditable={false}
          />
          {formErrors.phone && (
            <Alert severity="error" style={{ marginTop: '10px' }}>
              {formErrors.phone}
            </Alert>
          )}
        </FormControl>

        {/* Email */}
        <FormControl fullWidth>
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formValues.email}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.email && <Alert severity="error">{formErrors.email}</Alert>}
        </FormControl>

        {/* Country */}
        <FormControl fullWidth>
          <TextField
            label="Country"
            id="country"
            name="country"
            type="text"
            placeholder="Enter country"
            value={formValues.country}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.country && <Alert severity="error">{formErrors.country}</Alert>}
        </FormControl>

        {/* City */}
        <FormControl fullWidth>
          <TextField
            label="City"
            id="city"
            name="city"
            type="text"
            placeholder="Enter city"
            value={formValues.city}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.city && <Alert severity="error">{formErrors.city}</Alert>}
        </FormControl>

        {/* Sub-City */}
        <FormControl fullWidth>
          <TextField
            label="Sub-City"
            id="subCity"
            name="subCity"
            type="text"
            placeholder="Enter Sub-City"
            value={formValues.subCity}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.subCity && <Alert severity="error">{formErrors.subCity}</Alert>}
        </FormControl>

        {/* Wereda */}
        <FormControl fullWidth>
          <TextField
            label="Wereda"
            id="wereda"
            name="wereda"
            type="text"
            placeholder="Enter Wereda"
            value={formValues.wereda}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.wereda && <Alert severity="error">{formErrors.wereda}</Alert>}
        </FormControl>

        {/* Street Address */}
        <FormControl fullWidth>
          <TextField
            label="Street Address"
            id="streetAddress"
            name="streetAddress"
            type="text"
            placeholder="Enter street address"
            value={formValues.streetAddress}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.streetAddress && <Alert severity="error">{formErrors.streetAddress}</Alert>}
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" style={{ height: "40px", color: "#fff", backgroundColor: "#111" }}>
          Continue to payment
        </Button>
        {submitSuccess && <Alert severity="success">Form submitted successfully!</Alert>}
      </Box>
    </form>
  );
}
