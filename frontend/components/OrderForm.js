import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  TextField,
  Button,
  Alert,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: 'Ethiopia',
  city: 'Addis Ababa',
  subCity: '',
  streetAddress: '',
};

export default function OrderForm({ onFormSubmit, paymentMethod }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\+251(9|7)\d{8}$/;

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
    if (!values.subCity) errors.subCity = 'Sub City is required!';

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

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (validate(formValues)) {
      setSubmitSuccess(true);

      onFormSubmit({ ...formValues, phone: formValues.phone.replace(/^\+251/, '0') });

      setFormValues(initialValues);
    } else {
      setSubmitSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5 }}>
          <FormControl fullWidth>
            <TextField
              label="First name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              size="small"
              variant="outlined"
            />
            {formErrors.firstName && <Alert severity="error">{formErrors.firstName}</Alert>}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Last name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              size="small"
              variant="outlined"
            />
            {formErrors.lastName && <Alert severity="error">{formErrors.lastName}</Alert>}
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5 }}>
          <FormControl fullWidth>
            <PhoneInput
              placeholder="Enter phone number"
              value={formValues.phone}
              onChange={handlePhoneChange}
              defaultCountry="ET"
              international
              countryCallingCodeEditable={false}
            />
            {formErrors.phone && <Alert severity="error" sx={{ mt: 1 }}>{formErrors.phone}</Alert>}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              size="small"
              variant="outlined"
            />
            {formErrors.email && <Alert severity="error">{formErrors.email}</Alert>}
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5 }}>
          <FormControl fullWidth>
            <InputLabel size="small">Country</InputLabel>
            <Select
              label="country"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="Ethiopia">Ethiopia</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel size="small">City</InputLabel>
            <Select
              label="city"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="Addis Ababa">Addis Ababa</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <InputLabel size="small">Sub City</InputLabel>
          <Select
            label="Sub City"
            name="subCity"
            value={formValues.subCity}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["Addis Ketema", "Akaky Kaliti", "Arada", "Bole", "Gullele", "Kirkos", "Kolfe Keranio", "Lideta", "Nifas Silk-Lafto", "Yeka"].map((subCity) => (
              <MenuItem key={subCity} value={subCity}>{subCity}</MenuItem>
            ))}
          </Select>
          {formErrors.subCity && <Alert severity="error">{formErrors.subCity}</Alert>}
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Street Address"
            name="streetAddress"
            value={formValues.streetAddress}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
          {formErrors.streetAddress && <Alert severity="error">{formErrors.streetAddress}</Alert>}
        </FormControl>

        <Box
          onClick={handleSubmitForm}
          sx={{
            mt: 3,
            width: "100%",
            maxWidth: '250px',
            backgroundColor: '#111',
            color: '#fff',
            borderRadius: '33px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '42px',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'background .3s ease',

            '&:hover': {
              background: '#333',
            }
          }}
        >
          {paymentMethod === 'card' ? 'Continue to pay' : 'Place Order'}
        </Box>
        {submitSuccess && <Alert severity="success">Form submitted successfully!</Alert>}
      </Box>
    </form>
  );
}
