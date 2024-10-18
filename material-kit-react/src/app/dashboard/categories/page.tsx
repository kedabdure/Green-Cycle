"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Trash as DeleteIcon } from '@phosphor-icons/react';
import { set } from 'mongoose';

interface Category {
  _id: string;
  name: string;
  parent?: { _id: string; name: string };
  properties?: { name: string; values: string[] }[];
}

export default function Categories() {
  const [name, setName] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<string>('');
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [properties, setProperties] = useState<{ name: string; values: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createCategory, setCreateCategory] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await axios.get('/api/categories');
    setCategories(result.data);
  };

  const saveCategory = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!name) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill the required field: Category name required!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setIsLoading(false);
      return;
    }

    const data = {
      name,
      parentCategory: parentCategory || null,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(','),
      })),
    };

    try {
      if (editedCategory) {
        await axios.put(`/api/categories?id=${editedCategory._id}`, data);
        setEditedCategory(null);
        setIsLoading(false);
      } else {
        await axios.post('/api/categories', data);
        setIsLoading(false);
      }

      setName('');
      setParentCategory('');
      setProperties([]);
      setCreateCategory(false);

      fetchCategories();

      Swal.fire({
        title: 'Success',
        text: `Category ${editedCategory ? 'updated' : 'created'} successfully!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      if ((error as any).response && (error as any).response.status === 500) {
        errorMessage = 'Server error: Unable to save category.';
      } else if ((error as any).message === 'Network Error') {
        errorMessage = 'Network error: Please check your internet connection.';
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setIsLoading(false);
    }
  };

  const editCategory = (category: Category) => {
    setEditedCategory(category);
    setCreateCategory(true);
    setName(category.name);
    setParentCategory(category?.parent?._id || '');
    setProperties(
      (category.properties || []).map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
  };

  const handleDelete = (category: Category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${category.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/categories?_id=${category._id}`);
        fetchCategories();
        Swal.fire('Deleted!', `Your ${category.name} category has been deleted.`, 'success');
      }
    });
  };

  const addProperty = () => {
    setProperties((prev) => [...prev, { name: '', values: '' }]);
  };

  const handlePropertyNameChange = (index: number, newName: string) => {
    const updatedProperties = [...properties];
    updatedProperties[index].name = newName;
    setProperties(updatedProperties);
  };

  const handlePropertyValuesChange = (index: number, newValues: string) => {
    const updatedProperties = [...properties];
    updatedProperties[index].values = newValues;
    setProperties(updatedProperties);
  };

  const removeProperty = (indexToRemove: number) => {
    setProperties((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Container maxWidth="md">
      {createCategory && (
        <Stack spacing={2}>
          <Typography variant="h4" mb="1.5rem">
            {editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}
          </Typography>
          <form onSubmit={saveCategory}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category Name"
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  value={parentCategory}
                  onChange={(ev) => setParentCategory(ev.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">No Parent Category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <Box mt={2}>
              <Typography variant="h6" sx={{ mb: { xs: ".3rem", md: ".5rem" } }}>Properties</Typography>
              <Button variant="outlined" sx={{ fontSize: { xs: '.6rem', md: '.9rem' } }} onClick={addProperty}>
                Add New Property
              </Button>
              {properties.map((property, index) => (
                <Grid container spacing={2} key={index} mt={1}>
                  <Grid item xs={5}>
                    <TextField
                      label="Property Name"
                      fullWidth
                      value={property.name}
                      onChange={(ev) => handlePropertyNameChange(index, ev.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Values (comma-separated)"
                      fullWidth
                      value={property.values}
                      onChange={(ev) => handlePropertyValuesChange(index, ev.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => removeProperty(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>

            <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button type="submit" variant="contained" sx={{ fontSize: '.95rem', color: "#fff" }}>
                {isLoading ? (<CircularProgress size={24} color='inherit' />
                ) : (
                  editedCategory ? 'Update' : 'Save'
                )}
              </Button>
              <Button onClick={() => setCreateCategory(false)} variant="outlined" sx={{ fontSize: '.95rem', color: "secondary" }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Stack>
      )}

      {!createCategory && (
        <Stack spacing={2}>
          <Typography variant="h1" fontSize="2.7rem">
            Categories
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => setCreateCategory(true)}>
              Create Category
            </Button>
          </Box>

          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Parent Category</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category?.parent?.name || 'None'}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => editCategory(category)}
                          variant="outlined"
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(category)}
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      )}
    </Container>
  );
}
