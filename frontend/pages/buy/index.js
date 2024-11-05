import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FadeLoader } from 'react-spinners'
import {
  TextField
  ,
  Button,
  Alert,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from '@mui/material';
import { UploadSimple, X } from 'phosphor-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios'

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: 'Ethiopia',
  city: 'Addis Ababa',
  subCity: '',
  streetAddress: '',
  estimatedPrice: '',
  additionalInfo: '',
};

export default function SellFurnitureForm() {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false)

  const validate = () => {
    const errors = {};

    if (!formValues.firstName.trim()) errors.firstName = 'First name is required';
    if (!formValues.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formValues.phone) errors.phone = 'Phone number is required';
    if (!formValues.estimatedPrice) errors.estimatedPrice = 'Estimated price needed';
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formValues.subCity) errors.subCity = 'Sub city is required';
    if (!formValues.streetAddress.trim()) errors.streetAddress = 'Street address is required';
    if (!uploadedImages.image1) errors.image1 = 'Image 1 is required';
    if (!uploadedImages.image2) errors.image2 = 'Image 2 is required';
    if (!uploadedImages.image3) errors.image3 = 'Image 3 is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phone: value });
    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };


  const handleImageChange = async (ev) => {
    const files = ev.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const data = new FormData();
    Array.from(files).forEach((file) => data.append("file", file));
    data.append("directory", "/ecommerce/purchased-furniture");

    try {
      const res = await axios.post("/api/imageUpload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImages((prev) => [...prev, ...res.data.urls]);
    } catch (error) {
      setIsUploading(false);
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (image) => {
    setUploadedImages((prev) => prev.filter((img) => img !== image));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = { ...formValues, phone: formValues.phone.replace(/^\+251/, '0'), images: uploadedImages };
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          px: { xs: '1rem', md: '5rem' },
          py: { xs: '3rem', md: '5rem' },
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: { xs: 'flex-reverse', md: 'space-between' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: '2rem',
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            m: 'auto',
            my: { xs: '1', md: '2rem' },
            order: { xs: 2, md: 1 },
          }}
        >
          <Box sx={{ width: { md: '600px', xs: '100%' }, mb: '2.5rem' }}>
            <Typography variant="h1" sx={{ textAlign: 'left', fontSize: { xs: '1.7rem', md: '2rem' }, fontWeight: '600', mb: '1rem', lineHeight: '2.8rem' }}>
              Sell Your Furniture to <span style={{ backgroundColor: '#ddd', borderRadius: '33px', padding: '5px 10px' }}>Save</span> Forests
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'left', fontSize: '.8rem', color: '#555' }}>
              Thank you for choosing to sell your used furniture to us! Your contribution helps save countless trees from being cut down and supports sustainable practices that protect our environment.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Name Fields */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl fullWidth>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    size='small'
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    size='small'
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </FormControl>
              </Box>

              {/* Phone and Email */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl fullWidth>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={formValues.phone}
                    onChange={handlePhoneChange}
                    defaultCountry="ET"
                    international
                    countryCallingCodeEditable={false}
                    style={{
                      height: '40px',
                    }}
                  />
                  {formErrors.phone && (
                    <Typography color="error" variant="caption">
                      {formErrors.phone}
                    </Typography>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    type="email"
                    size='small'
                    variant="outlined"
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </FormControl>
              </Box>

              {/* City and Sub City */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select label="Country" name="country" size='small' value={formValues.country} onChange={handleChange}>
                    <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select label="City" size='small' name="city" value={formValues.city} onChange={handleChange}>
                    <MenuItem value="Addis Ababa">Addis Ababa</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Sub City and Street Address */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel size='small' sx={{ color: formErrors.subCity ? 'error.main' : 'text.primary' }}>
                    Sub City
                  </InputLabel>
                  <Select
                    label="Sub City"
                    name="subCity"
                    value={formValues.subCity}
                    onChange={handleChange}
                    error={!!formErrors.subCity}
                    size='small'
                  >
                    {[
                      'Addis Ketema',
                      'Akaky Kaliti',
                      'Arada',
                      'Bole',
                      'Gullele',
                      'Kirkos',
                      'Kolfe Keranio',
                      'Lideta',
                      'Nifas Silk-Lafto',
                      'Yeka',
                    ].map((subCity) => (
                      <MenuItem key={subCity} value={subCity}>
                        {subCity}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.subCity && (
                    <Typography color="error" variant="caption">
                      {formErrors.subCity}
                    </Typography>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="streetAddress"
                  value={formValues.streetAddress}
                  onChange={handleChange}
                  size='small'
                  variant="outlined"
                  error={!!formErrors.streetAddress}
                  helperText={formErrors.streetAddress}
                />
              </Box>

              {/* Estimated Price and Additional Info */}
              <TextField
                label="Estimated Price"
                name="estimatedPrice"
                value={formValues.estimatedPrice}
                onChange={handleChange}
                variant="outlined"
                size='small'
                error={!!formErrors.estimatedPrice}
                helperText={formErrors.estimatedPrice}
              />
              <TextField
                label="Additional Information (Optional)"
                name="additionalInfo"
                value={formValues.additionalInfo}
                onChange={handleChange}
                variant="outlined"
                size='small'
                multiline
                rows={3}
              />

              {/* Image Upload */}
              <Typography variant="body2" mt="1.5rem" fontSize={{ xs: '1rem', md: '1.1rem' }}>
                Upload At Least Three Sides of the Furniture!
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                {uploadedImages.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: { xs: "96px", md: "118px" },
                      height: { xs: "96px", md: "118px" },
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#DAE8FF",
                      borderRadius: "16px",
                    }}
                  >
                    {/* Uploaded Image */}
                    <Box
                      component="img"
                      src={image}
                      alt={`Uploaded Image ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                    {/* Delete Button */}
                    <X
                      size={22}
                      color="red"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteImage(image)}
                    />
                  </Box>
                ))}

                {/* Upload Button */}
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "96px", md: "118px" },
                    height: { xs: "96px", md: "118px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    backgroundColor: "#DAE8FF",
                  }}
                >
                  {isUploading ? (
                    <FadeLoader />
                  ) : (
                    <Button
                      component="label"
                      variant="outlined"
                      sx={{
                        width: "80%",
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#aaa",
                        border: '2px dashed #aaa',
                        borderRadius: "16px",
                        textTransform: "none",
                      }}
                    >
                      <UploadSimple size={32} color="#18BFF9" />
                      <Typography color="#18BFF9" fontSize={{ xs: ".4rem", md: ".6rem" }}>
                        Upload image
                      </Typography>
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleImageChange}
                      />
                    </Button>
                  )}
                </Box>
              </Box>


              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: '1.5rem',
                  mr: 'auto',
                  width: { xs: '100%', md: '20%' },
                  borderRadius: '33px',
                  backgroundColor: '#111',
                  color: '#fff',
                  padding: '8px 16px',
                  fontSize: '.9rem',
                  alignSelf: 'center',
                }}
              >
                Submit
              </Button>

              {submitted && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Form submitted successfully!
                </Alert>
              )}
            </Box>
          </form>
        </Box >

        {/* Right Section */}
        < Box
          sx={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            width: { xs: '100%', sm: '80%', md: '600px' },
            height: { xs: '400px', sm: '450px', md: '600px' },
            mx: 'auto',
            mt: { xs: '2rem' },
            order: { xs: 1, md: 2 },
          }
          }
        >
          <Image
            src={'/assets/images/furniture-storey.svg'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 80vw, 600px"
            alt="Image"
            placeholder="blur"
            blurDataURL='/assets/images/furniture-storey.svg'
            style={{ objectFit: "contain" }}
          />
        </Box >

        {/* Background SVG Top Right*/}
        < Box
          sx={{
            position: 'absolute',
            top: { xs: '-67%', md: '-50%' },
            right: { xs: '0%', md: '-60%' },
            zIndex: -1,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src="/assets/images/greenGradient.svg"
            fill
            alt="Background SVG"
            layout="fill"
            objectFit="cover"
          />
        </Box >

        {/* Background SVG bottom left*/}
        < Box
          sx={{
            position: 'absolute',
            bottom: { xs: '-70%', md: '-70%' },
            left: { xs: '0%', md: '-40%' },
            zIndex: -1,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src="/assets/images/greenGradient.svg"
            fill
            alt="Background SVG"
            layout="fill"
            objectFit="cover"
          />
        </Box >
      </Box >
      <Footer />
    </>
  );
}
