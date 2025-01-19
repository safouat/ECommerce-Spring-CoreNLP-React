import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  UserCircle,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const [userType, setUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("sessionToken");
      const currentUserType = localStorage.getItem("userType"); // Get current userType from localStorage
      const logoutEndpoint = `http://localhost:8009/logout/${currentUserType}`;

      const response = await fetch(logoutEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          message: "Logout request",
        }),
      });

      if (response.ok) {
        localStorage.removeItem("userType");
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("userId");
        setUserType(null);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderAuthButtons = () => {
    if (!userType) {
      return (
        <>
          <Link
            to="/login"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <LogIn className="h-6 w-6 mr-2" />
            <span className="hidden sm:inline text-sm">Login</span>
          </Link>

          <Link
            to="/register"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <UserCircle className="h-6 w-6 mr-2" />
            <span className="hidden sm:inline text-sm">Register</span>
          </Link>
        </>
      );
    }
    const handleSearchChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
      onSearch(query); // Pass the query to parent
    };

    return (
      <>
        <Link
          to={userType === "customer" ? "/ProfileCusto" : "/DashboardProducts"}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <UserCircle className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline text-sm">Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <LogOut className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline text-sm">Logout</span>
        </button>
      </>
    );
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value); // Pass search value to parent component
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-700 mr-4 cursor-pointer hover:text-gray-900" />
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700"
            >
              TechStore
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange} // Attach search change handler
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 bg-gray-50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-6">
            {renderAuthButtons()}
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
