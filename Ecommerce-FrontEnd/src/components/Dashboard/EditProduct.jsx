import React, { useState, useEffect } from 'react';
import {
  Package,
  FileText,
  DollarSign,
  Factory,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import Sidebar from '../comps/Sidebar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditProduct = () => {
  // State for the product details
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    manufacturer: '',
    category: '',
    image: null,
    quantity: '' // Add quantity field here
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const productId = useParams().productId;
  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:8009/product/${productId}`);
        const data = await response.json();

        // Set the product data in state
        setProduct({
          name: data.productName,
          description: data.description,
          price: data.price,
          manufacturer: data.manufacturer,
          category: data.category,
          quantity: data.quantity, // Set quantity from data
          image: null // You can manage image URL or state separately
        });

        // If the product has an image, set it as the preview image
        if (data.images && data.images.length > 0) {
          setPreviewImage(data.images[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []); // Empty dependency array to run once on component mount

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to update the product
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('sessionToken'); // Retrieve token from localStorage
  
    // Construct form data for the PUT request
    const updatedProduct = {
        "prodName": product.name,
        "manufaturer": product.manufacturer,
        "price": product.price,
        "quantity": product.quantity
      };
      
    console.log(updatedProduct);
    // Send the updated product data to the backend
    fetch(`http://localhost:8009/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Attach token if needed
      },
      body: JSON.stringify(updatedProduct), // Serialize the object to a JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product updated:', data);
        alert("Product updated successfully!");  // Show success alert
        navigate(`/DashboardProductDetails/${productId}`); // Navigate after successful update
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  
  // If data is still loading, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
            <div className="mb-8 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Product Description
                </label>
                <textarea
                  name="description"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 min-h-[120px]"
                  placeholder="Enter product description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter product price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Factory className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Manufacturer Name"
                  value={product.manufacturer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Quantity Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ImageIcon className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  Product Image
                </label>
                <div>
                  <input
                    type="file"
                    id="productImage"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('productImage').click()}
                    className="px-4 py-2 bg-[#4285F4] text-white rounded-md hover:bg-blue-600 focus:outline-none flex items-center gap-2"
                  >
                    <ImageIcon className="w-5 h-5" />
                    {previewImage ? 'Change Image' : 'Upload Image'}
                  </button>
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
