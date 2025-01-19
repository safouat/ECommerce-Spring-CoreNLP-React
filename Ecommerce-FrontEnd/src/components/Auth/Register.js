import React, { useState } from "react";
import { Eye, EyeOff, Link } from "lucide-react";

const RegisterPage = () => {
  const [userType, setUserType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    // Customer specific fields
    creditCard: {
      cardNumber: "",
      cardValidity: "",
      cardCVV: "",
    },
    addresses: {
      HOME: {
        streetNo: "",
        buildingName: "",
        locality: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // Customer specific validations
    if (userType === "customer") {
      if (
        formData.creditCard.cardNumber &&
        !/^\d{16}$/.test(formData.creditCard.cardNumber)
      ) {
        newErrors.cardNumber = "Invalid card number";
      }
      if (
        formData.creditCard.cardValidity &&
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.creditCard.cardValidity)
      ) {
        newErrors.cardValidity = "Invalid validity format (MM/YY)";
      }
      if (
        formData.creditCard.cardCVV &&
        !/^\d{3}$/.test(formData.creditCard.cardCVV)
      ) {
        newErrors.cardCVV = "Invalid CVV";
      }

      // Address validations
      if (!formData.addresses.HOME.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(formData.addresses.HOME.pincode)) {
        newErrors.pincode = "Invalid pincode";
      }
      if (!formData.addresses.HOME.city.trim())
        newErrors.city = "City is required";
      if (!formData.addresses.HOME.state.trim())
        newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url =
        userType === "customer"
          ? "http://localhost:8009/register/customer"
          : "http://localhost:8009/register/seller";

      const requestBody =
        userType === "customer"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              mobileNo: formData.mobile,
              emailId: formData.email,
              password: formData.password,
              creditCard: formData.creditCard,
              addresses: formData.addresses,
            }
          : {
              firstName: formData.firstName,
              lastName: formData.lastName,
              mobile: formData.mobile,
              emailId: formData.email,
              password: formData.password,
            };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
          alert(
            `${
              userType.charAt(0).toUpperCase() + userType.slice(1)
            } registration successful!`
          );
          Link("/login");
        } else {
          alert(`Error: ${result.detail}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("card")) {
      setFormData((prev) => ({
        ...prev,
        creditCard: {
          ...prev.creditCard,
          [name]: value,
        },
      }));
    } else if (name.startsWith("address")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addresses: {
          ...prev.addresses,
          HOME: {
            ...prev.addresses.HOME,
            [addressField]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join us to start shopping or selling
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setUserType("customer")}
              className={`flex-1 py-2 px-4 rounded-lg ${
                userType === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setUserType("seller")}
              className={`flex-1 py-2 px-4 rounded-lg ${
                userType === "seller"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6 space-y-4"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } shadow-sm p-2`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Customer-specific fields */}
          {userType === "customer" && (
            <>
              {/* Credit Card Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.creditCard.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    } shadow-sm p-2`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Valid Until
                    </label>
                    <input
                      type="text"
                      name="cardValidity"
                      value={formData.creditCard.cardValidity}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.cardValidity
                          ? "border-red-500"
                          : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.cardValidity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cardValidity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.creditCard.cardCVV}
                      onChange={handleChange}
                      placeholder="123"
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.cardCVV ? "border-red-500" : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.cardCVV && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cardCVV}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Street No
                    </label>
                    <input
                      type="text"
                      name="address.streetNo"
                      value={formData.addresses.HOME.streetNo}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Building Name
                    </label>
                    <input
                      type="text"
                      name="address.buildingName"
                      value={formData.addresses.HOME.buildingName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Locality
                  </label>
                  <input
                    type="text"
                    name="address.locality"
                    value={formData.addresses.HOME.locality}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.addresses.HOME.city}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.addresses.HOME.state}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.addresses.HOME.pincode}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    } shadow-sm p-2`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
