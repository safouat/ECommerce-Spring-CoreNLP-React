import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ArrowLeft,
  ArrowRight,
  Send,
  X,
} from "lucide-react";

// Custom Alert Component
const Alert = ({ children, onClose }) => (
  <div
    className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <span className="block sm:inline">{children}</span>
    <button
      onClick={onClose}
      className="absolute top-0 bottom-0 right-0 px-4 py-3"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
);

// Static features array
const staticFeatures = [
  "High-resolution display",
  "Advanced camera system",
  "Long battery life",
  "5G connectivity",
];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { productId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [content, setContent] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const productResponse = await fetch(
          `http://localhost:8009/product/${productId}`
        );
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch product images
        const imagesResponse = await fetch(
          `http://localhost:8009/products/${productId}/images`
        );
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          setProductImages(imagesData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, Math.min(newQuantity, product.quantity)));
  };

  const handleImageNav = (direction) => {
    if (direction === "next") {
      setSelectedImage((prev) => (prev + 1) % productImages.length);
    } else {
      setSelectedImage(
        (prev) => (prev - 1 + productImages.length) % productImages.length
      );
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const cartItem = {
      productId: productId,
      productName: product.productName,
      price: product.price.toFixed(2),
      quantity: quantity,
    };

    try {
      const response = await fetch("http://localhost:8009/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        const error = await response.json();
        alert(`Failed to add item to cart: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      content: content,
    };

    try {
      const response = await fetch(
        `http://localhost:8009/comments/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("sessionToken"),
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (response.ok) {
        alert("Review submitted successfully!");
        setContent("");
        window.location.reload();
      } else {
        alert("Failed to submit the review. You are Not Allowed!");
      }
    } catch (error) {
      alert("An error occurred while submitting your review.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>
            Product added to cart successfully!
          </Alert>
        )}

        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              /
              <a href="#" className="hover:text-gray-900">
                {product.category}
              </a>
            </li>
            <li>
              /
              <a href="#" className="hover:text-gray-900">
                {product.productName}
              </a>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
                {productImages.length > 0 ? (
                  <img
                    src={`http://localhost:8009${productImages[selectedImage]?.imageUrl}`}
                    alt={`${product.productName} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}

                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNav("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleImageNav("next")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="flex space-x-4">
                  {productImages.map((img, idx) => (
                    <button
                      key={img.imageId}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden ${
                        selectedImage === idx ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <img
                        src={`http://localhost:8009${img.imageUrl}`}
                        alt={`${product.productName} - Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.productName}
                </h1>
                <p className="text-2xl font-semibold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.comment.length} reviews)
                </span>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  {staticFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value))
                      }
                      className="w-16 text-center border-x py-2"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.quantity} units available
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-50">
                    <Heart className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-50">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Manufacturer</span>
                    <span className="text-gray-600">
                      {product.manufacturer}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Status</span>
                    <span className="text-green-600">{product.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="mb-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <textarea
                  placeholder="Share your thoughts about this product..."
                  className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

          {/* Reviews Section */}
          <div className="border-t">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {product.comment.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 mb-2">{review.content}</p>
                    <div className="flex items-center space-x-4">
                      {review.sentiment && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.sentiment === "POSITIVE"
                              ? "bg-green-100 text-green-800"
                              : review.sentiment === "NEUTRAL"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {review.sentiment}
                        </span>
                      )}
                      {review.concept && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
                          {review.concept}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
