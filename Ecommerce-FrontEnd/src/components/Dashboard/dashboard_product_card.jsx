import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmilePlus, Meh, Frown, AngryIcon, LaughIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sentiment Rating Component
const SentimentRating = ({ rating }) => {
  const getSentimentIcon = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating <= 1) return <AngryIcon className="text-red-500" />;
    if (numRating <= 2) return <Frown className="text-yellow-500" />;
    if (numRating <= 3) return <Meh className="text-blue-500" />;
    if (numRating <= 4) return <SmilePlus className="text-indigo-500" />;
    return <LaughIcon className="text-green-500" />;
  };

  return (
    <div className="flex items-center gap-1">
      {getSentimentIcon(rating)}
      <span className="text-sm text-gray-600">{rating}/5</span>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product = {
  id: 1,
  title: "Wireless Headphones",
  price: 99.99,
  rating: 4.5,
  reviews: 128,
  imageUrl: "/api/placeholder/300/200"
}}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <Link 
            to={`/product/${product.id}`}
            className="text-lg font-semibold hover:text-blue-600 transition-colors"
          >
            {product.title}
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <SentimentRating rating={product.rating} />
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <Button 
          className="w-full"
          asChild
        >
          <Link to={`/DashboardProductDetails`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            See Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Dashboard Products Component
const DashboardProducts = () => {
  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 99.99,
      rating: 4.5,
      reviews: 128,
      imageUrl: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      rating: 4.8,
      reviews: 256,
      imageUrl: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 79.99,
      rating: 4.2,
      reviews: 92,
      imageUrl: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Wireless Earbuds",
      price: 149.99,
      rating: 4.6,
      reviews: 175,
      imageUrl: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DashboardProducts;