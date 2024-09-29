import React, { useState } from 'react';
// import { MuiTelInput } from 'mui-tel-input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import {
  TextField,
  Button,
  Alert,
  FormControl,
  Box,
} from '@mui/material';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  zipCode: '',
};

export default function TableOrderForm({ handleSubmit }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\+2519\d{8}$/;
    const zipCodeRegex = /^\d{4,6}$/; // Modify based on zip code format

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
      errors.phone = 'Invalid phone number format (+2519XXXXXXXX)';
    }
    if (!values.address1) errors.address1 = 'Address Line 1 is required!';
    if (!values.city) errors.city = 'City is required!';
    if (!values.zipCode) {
      errors.zipCode = 'Zip Code is required!';
    } else if (!zipCodeRegex.test(values.zipCode)) {
      errors.zipCode = 'Invalid Zip Code format!';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const handlePhoneChange = (value) => {
    // const sanitizedValue = value.replace(/\s+/g, '');
    setFormValues({ ...formValues, phone: value });
    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };

  function handleSubmitForm(e) {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      setSubmitSuccess(true);
      handleSubmit(formValues);
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
          gap: '20px',
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

        {/* Address Line 1 */}
        <FormControl fullWidth>
          <TextField
            label="Address Line 1"
            id="address1"
            name="address1"
            type="text"
            placeholder="123 Main St"
            value={formValues.address1}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.address1 && <Alert severity="error">{formErrors.address1}</Alert>}
        </FormControl>

        {/* Address Line 2 */}
        <FormControl fullWidth>
          <TextField
            label="Address Line 2"
            id="address2"
            name="address2"
            type="text"
            placeholder="Apartment, Suite, etc."
            value={formValues.address2}
            onChange={handleChange}
            size="small"
          />
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

        {/* Zip Code */}
        <FormControl fullWidth>
          <TextField
            label="Zip Code"
            id="zipCode"
            name="zipCode"
            type="text"
            placeholder="Enter zip code"
            value={formValues.zipCode}
            onChange={handleChange}
            required
            size="small"
          />
          {formErrors.zipCode && <Alert severity="error">{formErrors.zipCode}</Alert>}
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" style={{ height: "40px", color: "#fff", backgroundColor: "#111" }}>
          Place Order
        </Button>
        {submitSuccess && <Alert severity="success">Form submitted successfully!</Alert>}
      </Box>
    </form>
  );
}
