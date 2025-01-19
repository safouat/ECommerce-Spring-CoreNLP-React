import React, { useState, useEffect } from 'react';
import { SmilePlus, Meh, Frown, AngryIcon, LaughIcon, ExternalLink } from 'lucide-react';
import Sidebar from '../comps/Sidebar';

// Sentiment Rating Component
const SentimentRating = ({ sentimentCounts }) => {
    const getSentimentIcon = (sentimentCounts) => {
      const positive = sentimentCounts?.POSITIVE || 0;
      const negative = sentimentCounts?.NEGATIVE || 0;
  
      if (positive > negative) {
        return <SmilePlus className="text-indigo-500" />;
      } else if (negative > positive) {
        return <AngryIcon className="text-red-500" />;
      } else {
        return <Meh className="text-blue-500" />;
      }
    };
  
    // Defaulting to 0 if sentimentCounts is missing or improperly structured
    const positiveCount = sentimentCounts?.POSITIVE ?? 0;
    const negativeCount = sentimentCounts?.NEGATIVE ?? 0;
  
    return (
      <div className="flex items-center gap-1">
        {getSentimentIcon(sentimentCounts)}
        <span className="text-sm text-gray-600">
          {positiveCount + negativeCount} reviews
        </span>
      </div>
    );
  };
  
// Product Card Component
const ProductCard = ({ product, sentimentCounts }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={product.imageUrl || '/api/placeholder/300/200'}
            alt={product.productName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <a
              href={`/DashboardProductDetails`}
              className="text-lg font-semibold hover:text-blue-600 transition-colors"
            >
              {product.productName}
            </a>
          </div>
  
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <SentimentRating sentimentCounts={sentimentCounts} />
            </div>
          </div>
  
          <a
            href={`/DashboardProductDetails/${product.productId}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            See Details
          </a>
        </div>
      </div>
    );
  };
  

  const DashboardProducts = () => {
    const [products, setProducts] = useState([]);
    const [sentimentData, setSentimentData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      const sessionToken = localStorage.getItem('sessionToken');
    
      const fetchProducts = async () => {
        try {
          const productResponse = await fetch(`http://localhost:8009/products/seller/${userId}`, {
            method: 'GET',
            headers: {
              'token': sessionToken,
              'Content-Type': 'application/json',
            },
          });
    
          if (!productResponse.ok) {
            throw new Error('Failed to fetch products');
          }
    
          const productData = await productResponse.json();
          setProducts(productData);
          console.log(productData);
    
          // Fetch images for each product
          const updatedProductData = await Promise.all(
            productData.map(async (product) => {
              try {
                // Fetch first image for this product
                const imageResponse = await fetch(`http://localhost:8009/products/${product.productId}/images`, {
                  method: 'GET',
                  headers: {
                    'token': sessionToken,
                    'Content-Type': 'application/json',
                  },
                });
    
                if (imageResponse.ok) {
                  const images = await imageResponse.json();
                  product.imageUrl = images.length > 0 ? 'http://localhost:8009' + images[0].imageUrl : '/api/placeholder/300/200';
                } else {
                  product.imageUrl = '/api/placeholder/300/200';
                }
              } catch (err) {
                console.error(`Failed to fetch image for product ${product.productId}`, err);
                product.imageUrl = '/api/placeholder/300/200';
              }
    
              return product;
            })
          );
    
          setProducts(updatedProductData);
    
          // Fetch sentiment data for each product
          const sentimentDataMap = {};
    
          for (const product of updatedProductData) {
            try {
              const sentimentResponse = await fetch(`http://localhost:8009/comments/analysis/${product.productId}`, {
                method: 'GET',
                headers: {
                  'token': sessionToken,
                  'Content-Type': 'application/json',
                },
              });
    
              if (!sentimentResponse.ok) {
                throw new Error(`Failed to fetch sentiment for product ${product.productId}`);
              }
    
              const sentiment = await sentimentResponse.json();
              sentimentDataMap[product.productId] = sentiment.sentimentCounts || {};
            } catch (err) {
              console.error(err.message);
            }
          }
    
          setSentimentData(sentimentDataMap);
          console.log(sentimentDataMap);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchProducts();
    }, []);
  
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
            <div className="p-6">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Products</h2>
              {products.length === 0 ? (
                <div className="text-center text-gray-500 col-span-full">
                  <p>No products available yet.</p>
                  <p className="text-sm">Add some products to your inventory to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      sentimentCounts={sentimentData[product.productId]}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardProducts;