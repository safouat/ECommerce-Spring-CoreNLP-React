import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import { ChevronRight, Star } from "lucide-react";

const ProductHomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8009/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const categories = [
          { id: 1, name: "All", count: data.length },
          ...[...new Set(data.map((product) => product.category))].map(
            (category, index) => ({
              id: index + 2,
              name: category,
              count: data.filter((product) => product.category === category)
                .length,
            })
          ),
        ];
        setCategories(categories);

        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            const imageResponse = await fetch(
              `http://localhost:8009/products/${product.productId}/images`
            );
            if (imageResponse.ok) {
              const images = await imageResponse.json();
              product.image =
                images.length > 0
                  ? "http://localhost:8009" + images[0].imageUrl
                  : "/api/placeholder/300/200";
            } else {
              product.image = "/api/placeholder/300/200";
            }
            return product;
          })
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Search handler
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    // Reset category selection when searching
    setSelectedCategory("All");
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.image || "/api/placeholder/300/300"}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.productName}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 4)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
          <div className="ml-auto flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`${
                  selectedCategory === category.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-700"
                } px-4 py-2 rounded-full text-sm font-medium focus:outline-none`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.productId} to={`/product/${product.productId}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHomepage;
