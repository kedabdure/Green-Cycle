import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Categories() {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // FETCH
  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }

  // SAVE
  async function saveCategory(ev) {
    ev.preventDefault();

    // Validate required fields before making API call
    if (!name) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill the required field: Category name required!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      name,
      parentCategory,
      properties: properties.map(property => ({
        name: property.name,
        values: property.values.split(','),
      })),
    };

    try {
      if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put('/api/categories', data);
        setEditedCategory(null);
      } else {
        await axios.post('/api/categories', data);
      }

      setName('');
      setParentCategory('');
      setProperties([]);

      fetchCategories();

      Swal.fire({
        title: 'Success',
        text: `Category ${editedCategory ? 'updated' : 'created'} successfully!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response && error.response.status === 500) {
        errorMessage = 'Server error: Unable to save category.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error: Please check your internet connection.';
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  // EDIT
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
    setProperties(
      (category.properties || []).map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
  }

  // DELETE
  function handleDelete(category) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${category.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          `Your ${category.name} category has been deleted.`,
          'success'
        );
        const { _id } = category;
        await axios.delete('/api/categories?_id=' + _id);
        fetchCategories();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `Your ${category.name} category is safe.`,
          'error'
        );
      }
    });
  }

  // ADD PROPERTY
  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  // HANDLE PROPERTY NAME CHANGE
  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  // HANDLE PROPERTY VALUES CHANGE
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  // REMOVE PROPERTY
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => pIndex !== indexToRemove);
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : 'Create new category'}
      </label>
      <form onSubmit={saveCategory}>
        <div className='flex gap-1'>
          <input
            type="text"
            placeholder={'Category name'}
            onChange={ev => setName(ev.target.value)}
            value={name}
          />

          <select
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value=""> No parent category</option>
            {categories.length > 0 && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Property Form */}
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2">
            Add new property
          </button>
          {properties.length > 0 && properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input type="text"
                value={property.name}
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder="property name (example: color)" />
              <input type="text"
                className="mb-0"
                onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)}
                value={property.values}
                placeholder="values, comma separated" />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-default">Cancel</button>
          )}
          <button type="submit" className="btn-primary py-1">Save</button>
        </div>
      </form>

      {/* Categories Table */}
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-default mr-1">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="btn-red">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
