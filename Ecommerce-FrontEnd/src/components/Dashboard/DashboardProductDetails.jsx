import React, { useEffect, useState } from 'react';
import { 
  Star,
  Edit,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Delete
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import Sidebar from '../comps/Sidebar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const DashboardProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [sentimentCounts, setSentimentCounts] = useState(null);
  const [topConcepts, setTopConcepts] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
const [unitsSold, setUnitsSold] = useState(null);
  const { productId } = useParams();
    console.log(productId);
  const salesData = [
    { name: 'Mon', sales: 4 },
    { name: 'Tue', sales: 3 },
    { name: 'Wed', sales: 5 },
    { name: 'Thu', sales: 2 },
    { name: 'Fri', sales: 4 },
    { name: 'Sat', sales: 6 },
    { name: 'Sun', sales: 4 },
  ];
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch(`http://localhost:8009/product/${productId}`);
        if (!productRes.ok) throw new Error('Failed to fetch product data');
        const productData = await productRes.json();
        setProduct(productData);
        
        const imageResponse = await fetch(`http://localhost:8009/products/${productData.productId}/images`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (imageResponse.ok) {
        const images = await imageResponse.json();
        productData.imageUrl = images.length > 0 ? 'http://localhost:8009' + images[0].imageUrl : '/api/placeholder/300/200';
      } else {
        productData.imageUrl = '/api/placeholder/300/200';
      }

      setProduct(productData);

        const sentimentRes = await fetch(`http://localhost:8009/comments/analysis/${productId}`);
        if (!sentimentRes.ok) throw new Error('Failed to fetch sentiment data');
        const sentimentData = await sentimentRes.json();
        setSentimentCounts(sentimentData.sentimentCounts);
        setTopConcepts(sentimentData.topConcepts);

        const cartRes = await fetch(`http://localhost:8009/cart/${productId}`);
      if (!cartRes.ok) throw new Error('Failed to fetch cart data');
      const cartData = await cartRes.json();
      setTotalSales(cartData.totalPrice);  // Set Total Sales
      setUnitsSold(cartData.totalQuantity);  // Set Units Sold
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [productId]);
  
  const onHandleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:8009/product/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Product deleted successfully.");
        // Optionally refresh the product list or navigate elsewhere
        navigate("/DashboardProducts")
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete product: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while trying to delete the product.");
    }
  };
  
  if (!product || !sentimentCounts || !topConcepts) {
    return <div>Loading...</div>;
  }

  // Prepare radar chart data based on top concepts
  const radarData = topConcepts.map((concept) => {
    const [key, value] = Object.entries(concept)[0];
    return {
      subject: key, // The name of the concept
      A: value,     // The occurrence count
      fullMark: 5   // Set an arbitrary maximum value for the chart
    };
  });
  

  // Sentiment distribution data for display
  const sentimentData = [
    { name: "Positive", count: sentimentCounts.POSITIVE },
    { name: "Negative", count: sentimentCounts.NEGATIVE },
    { name: "Neutral", count: sentimentCounts.NEUTRAL }
  ];

  const getRatingIcon = (rating) => {
    const numRating = parseFloat(rating);
    let color = "text-yellow-500";
    
    if (numRating <= 2) color = "text-red-500";
    else if (numRating <= 3) color = "text-orange-500";
    else if (numRating <= 4) color = "text-blue-500";
    else color = "text-green-500";

    return <Star className={`w-5 h-5 ${color}`} fill="currentColor" />;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Main Product Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Image */}
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">{product.productName}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
  {getRatingIcon(product.rating)}
  <span className="text-gray-700">
    {sentimentCounts.POSITIVE + sentimentCounts.NEGATIVE + sentimentCounts.NEUTRAL} reviews
  </span>
</div>

<div className="flex space-x-4">
  <button
    className="inline-flex items-center px-6 py-2 bg-blue-500 text-white font-medium text-sm rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
    onClick={() => window.location.href = `/edit/${product.productId}`}
  >
    <Edit className="w-5 h-5 mr-2" />
    Edit Product
  </button>

  <button
    className="inline-flex items-center px-6 py-2 bg-red-500 text-white font-medium text-sm rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
    onClick={() => onHandleDelete(product.productId)}
  >
    <Delete className="w-5 h-5 mr-2" />
    Delete Product
  </button>
</div>

                </div>

                {/* Radar Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Topics"
                        dataKey="A"
                        stroke="#4F46E5"
                        fill="#4F46E5"
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

           

            {/* Sentiment Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Distribution</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {sentimentData.map((sentiment) => (
                  <div key={sentiment.name} className="bg-gray-100 p-4 rounded-lg text-center">
                    <h4 className="text-lg font-semibold">{sentiment.name}</h4>
                    <p className="text-2xl font-bold">{sentiment.count}</p>
                  </div>
                ))}
              </div>
            </div>

             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">Total Sales</p>
        <p className="text-2xl font-bold text-gray-800">
          ${totalSales !== null ? totalSales.toFixed(2) : 'Loading...'}
        </p>
      </div>
      <DollarSign className="w-8 h-8 text-green-500" />
    </div>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">Units Sold</p>
        <p className="text-2xl font-bold text-gray-800">
          {unitsSold !== null ? unitsSold : 'Loading...'} Units
        </p>
      </div>
      <ShoppingCart className="w-8 h-8 text-blue-500" />
    </div>
  </div>

  
</div>


          
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
