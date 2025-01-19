import React, { useState } from 'react';
import { 
  Package,
  Upload,
  X
} from 'lucide-react';
import Sidebar from '../comps/Sidebar';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    manufacturer: '',
    category: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const categories = ["FASHION", "BOOKS", "GROCERIES", "ELECTRONICS", "FURNITURE"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleImageFiles(files);
  };

  const handleImageFiles = (files) => {
    const newImages = [...product.images];
    const newPreviews = [...previewImages];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newImages.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          setPreviewImages([...newPreviews]);
        };
        reader.readAsDataURL(file);
      }
    });

    setProduct(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const removeImage = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setProduct(prev => ({
      ...prev,
      images: newImages
    }));
    setPreviewImages(newPreviews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    const productData = {
        productName: product.name,
        price: parseFloat(product.price),
        description: product.description,
        manufacturer: product.manufacturer,
        category: product.category,
        status: 'AVAILABLE',
        quantity: 100
    };

    const productBlob = new Blob([JSON.stringify(productData)], { type: 'application/json' });
    formData.append('product', productBlob, 'product.json');
    
    product.images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
        const sessionToken = localStorage.getItem('sessionToken');
        const response = await fetch('http://localhost:8009/products', {
            method: 'POST',
            headers: {
                'token': sessionToken
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            setStatusMessage(`Failed to add product: ${errorData.message || 'Please try again.'}`);
            return;
        }

        setStatusMessage('Product added successfully!');
        setProduct({
            name: '',
            description: '',
            price: '',
            manufacturer: '',
            category: '',
            images: []
        });
        setPreviewImages([]);
    } catch (error) {
        console.error('Error:', error);
        setStatusMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={product.manufacturer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter manufacturer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    multiple
                    id="images"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drag and drop images here or click to browse</p>
                    <p className="text-sm text-gray-500 mt-2">Supports multiple images</p>
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </form>

            {statusMessage && (
              <div className={`mt-4 p-4 rounded-lg text-center ${
                statusMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;