import React, { useState } from "react";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";

const LoginPage = () => {
  const [userType, setUserType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (validateForm()) {
      setIsLoading(true);

      try {
        // Set the appropriate endpoint based on user type
        const endpoint =
          userType === "customer"
            ? "http://localhost:8009/login/customer"
            : "http://localhost:8009/login/seller";

        // Define the payload based on user type
        const payload =
          userType === "customer"
            ? {
                mobileId: Number(formData.mobile),
                password: formData.password,
              }
            : {
                mobile: Number(formData.mobile),
                password: formData.password,
              };

        // Check if a session token already exists, otherwise skip sending it initially
        const token = localStorage.getItem("sessionToken");

        // Prepare the request headers with or without token
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Make the login request
        const response = await fetch(endpoint, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        });

        // Handle the response and check for successful login
        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        // Store the received token and other details in localStorage
        localStorage.setItem("sessionToken", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userType", data.userType);

        // Redirect to the appropriate page after login
        window.location.href = "/";
      } catch (error) {
        setErrors({
          submit:
            "Failed to login. Please check your credentials and try again.",
        });
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                userType === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType("seller")}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                userType === "seller"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter 10 digit mobile number"
                  maxLength={10}
                />
              </div>
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* General Error Message */}
            {errors.submit && (
              <p className="text-center text-sm text-red-500">
                {errors.submit}
              </p>
            )}
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
