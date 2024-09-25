import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  category: assignedCategory,
  description: existingDescription,
  price: existingPrice,
  images: existingImages = [],
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }

  // Save product with validation and error handling
  async function saveProduct(ev) {
    ev.preventDefault();

    // Validate required fields
    if (!title || !category || !price || !images.length) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields: Product name, category, price, and at least one image.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = {
      title, description, price, images, category,
      properties: productProperties,
    };

    try {
      if (_id) {
        // Update existing product
        await axios.put('/api/products', { ...data, _id });
      } else {
        // Create new product
        await axios.post('/api/products', data);
      }
      setGoToProducts(true);

      Swal.fire({
        title: 'Success',
        text: `Product ${_id ? 'updated' : 'created'} successfully!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response && error.response.status === 500) {
        errorMessage = 'Server error: Unable to save product.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error: Please check your internet connection.';
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      try {
        const res = await axios.post('/api/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImages((oldImages) => [...oldImages, ...res.data.links]);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to upload images. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsUploading(false);
      }
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function removeImage(link) {
    setImages(images.filter(img => img !== link));
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />

      {/* Product Category */}
      <label>Category</label>
      <select
        onChange={ev => setCategory(ev.target.value)}
        value={category}
        className='mb-0'
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Image Upload Section */}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!images?.length && images.map(link => (
            <div key={link} className="relative h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg" />
              <button
                onClick={() => removeImage(link)}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}

        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>Add image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />

      <label>Price (in USD)</label>
      <input
        type="number" placeholder="price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />

      <button
        type="submit"
        className="btn-primary">
        Save
      </button>
    </form>
  );
}
