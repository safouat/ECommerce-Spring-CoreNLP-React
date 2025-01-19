import React, { useState, useEffect } from "react";
import { Trash2, X, ShoppingBag, ArrowLeft } from "lucide-react";

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

const ShoppingCart = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("http://localhost:8009/cart", {
          method: "GET",
          headers: {
            token: localStorage.getItem("sessionToken"),
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCartItems(data.cartItems || []);
        setCartTotal(data.cartTotal || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const response = await fetch("http://localhost:8009/customer/current", {
          method: "GET",
          headers: {
            token: localStorage.getItem("sessionToken"),
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCartData();
    fetchCustomerData();
  }, []);

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, cartItemQuantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setCartItems((items) =>
      items.filter((item) => item.cartItemId !== cartItemId)
    );
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCheckout = async () => {
    if (!customerData) return;
    setCheckoutLoading(true);

    const { creditCard, address } = customerData;

    const orderData = {
      cardNumber: {
        cardNumber: creditCard.cardNumber,
        cardValidity: creditCard.cardValidity,
        cardCVV: creditCard.cardCVV,
      },
      addressType: "HOME", // Assuming address type is always "HOME"
    };

    try {
      const response = await fetch("http://localhost:8009/order/place", {
        method: "POST",
        headers: {
          token: localStorage.getItem("sessionToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully");
        window.location.reload();
        // Handle successful order placement (e.g., redirect to order confirmation)
      } else {
        alert("Error placing order: " + data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Ensure cartItems is an array before performing reduce operation
  const subtotal = (cartItems || []).reduce(
    (sum, item) => sum + item.cartProduct.price * item.cartItemQuantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 15.99;
  const total = subtotal + tax + shipping;

  if (loading || checkoutLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showAlert && (
          <div
            className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">Item removed from cart</span>
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <a href="#" className="flex items-center text-blue-600 mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </a>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-6 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          item.cartProduct.image || "/api/placeholder/100/100"
                        }
                        alt={item.cartProduct.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.cartProduct.productName}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          ${item.cartProduct.price.toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.cartItemQuantity - 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.cartItemQuantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.cartItemId,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-12 text-center border-x py-1"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.cartItemQuantity + 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
