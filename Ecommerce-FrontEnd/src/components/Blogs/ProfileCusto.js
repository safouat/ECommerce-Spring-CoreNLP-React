import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  Lock,
  Trash2,
  AlertCircle,
  X,
  ChevronRight,
} from "lucide-react";

const Alert = ({ children, onClose }) => (
  <div
    className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center gap-2 shadow-lg"
    role="alert"
  >
    <span className="block sm:inline">{children}</span>
    <button onClick={onClose} className="ml-4">
      <X className="h-4 w-4" />
    </button>
  </div>
);
const ProfileSection = ({
  title,
  icon: Icon,
  children,
  isExpanded,
  onToggle,
}) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
    <button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>
      <ChevronRight
        className={`w-5 h-5 text-gray-400 transition-transform ${
          isExpanded ? "rotate-90" : ""
        }`}
      />
    </button>
    {isExpanded && (
      <div className="p-4 border-t border-gray-100 bg-gray-50">{children}</div>
    )}
  </div>
);

const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        {...props}
        className="pl-10 block w-full rounded-lg border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

const ProfileCusto = () => {
  const [expandedSection, setExpandedSection] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
  });

  const [address, setAddress] = useState({
    street: "123 Main St",
    city: "Anytown",
    state: "ST",
    zipCode: "12345",
    country: "United States",
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardValidity: "",
    cardCVV: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });

  // Handler functions
  const handleUpdateCredentials = async () => {
    // Validation
    if (!personalInfo.email || !personalInfo.mobile) {
      alert("Please fill in both email and mobile fields.");
      return;
    }

    // Ensure the session token is present
    const sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) {
      alert("Session expired. Please log in again.");
      return;
    }

    const requestBody = {
      emailId: personalInfo.email,
      mobileNo: personalInfo.mobile,
    };

    try {
      const response = await fetch(
        "http://localhost:8009/customer/update/credentials",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: sessionToken, // Match the backend requirement
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert("Contact information updated successfully!");
    } catch (error) {
      console.error("Error updating contact information:", error);
      alert(`Failed to update contact information: ${error.message}`);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const sessionToken = localStorage.getItem("sessionToken"); // Retrieve session token from localStorage

    // Check if session token exists
    if (!sessionToken) {
      showAlertMessage("error", "Session expired. Please log in again.");
      return;
    }

    // Ensure all address fields are present
    const updatedAddress = {
      streetNo: address.streetNo || "Not provided",
      buildingName: address.buildingName || "Not provided",
      pincode: address.pincode || "Not provided",
      city: address.city || "Not provided",
      locality: address.locality || "Not provided",
      state: address.state || "Not provided",
    };

    try {
      const response = await fetch(
        "http://localhost:8009/customer/update/address?type=home",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`, // Include session token in Authorization header
          },
          body: JSON.stringify(updatedAddress),
        }
      );

      if (response.ok) {
        showAlertMessage("success", "Address updated successfully");
      } else {
        showAlertMessage("error", "Failed to update address");
      }
    } catch (error) {
      showAlertMessage("error", "Failed to update address");
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await fetch("/customer/delete/address?type=home", {
        method: "DELETE",
      });
      if (response.ok) {
        setAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        });
        showAlertMessage("success", "Address deleted successfully");
      }
    } catch (error) {
      showAlertMessage("error", "Failed to delete address");
    }
  };

  const handleUpdateCard = async (event) => {
    event.preventDefault();

    if (!cardInfo.cardNumber || !cardInfo.cardValidity || !cardInfo.cardCVV) {
      alert("Please fill in all card information.");
      return;
    }

    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      alert("Session expired. Please log in again.");
      return;
    }

    const requestBody = {
      cardNumber: cardInfo.cardNumber,
      cardValidity: cardInfo.cardValidity,
      cardCVV: cardInfo.cardCVV,
    };

    try {
      const response = await fetch(
        "http://localhost:8009/customer/update/card",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("sessionToken"),
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert("Payment method updated successfully!");
    } catch (error) {
      console.error("Error updating payment method:", error);
      alert(`Failed to update payment method: ${error.message}`);
    }
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    // Extract mobile ID and new password from the form
    const mobileId = event.target.mobileId.value;
    const newPassword = event.target.newPassword.value;

    // Validate inputs
    if (!mobileId || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      alert("Session expired. Please log in again.");
      return;
    }

    const requestBody = {
      mobileId,
      password: newPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:8009/customer/update/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: sessionToken, // Attach the session token
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful response
      alert("Password updated successfully. You will be logged out.");

      // Clear session token and redirect to login page
      localStorage.removeItem("sessionToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error updating password:", error);
      alert(`Failed to update password: ${error.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch("/customer", {
          method: "DELETE",
        });
        if (response.ok) {
          showAlertMessage("success", "Account deleted successfully");
          // Redirect to home page or login page
          window.location.href = "/";
        }
      } catch (error) {
        showAlertMessage("error", "Failed to delete account");
      }
    }
  };

  const showAlertMessage = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences</p>
        </div>

        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>{alertInfo.message}</Alert>
        )}

        <div className="space-y-4">
          <ProfileSection
            title="Personal Information"
            icon={User}
            isExpanded={expandedSection === "personal"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "personal" ? "" : "personal"
              )
            }
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUpdateCredentials();
              }}
              className="space-y-4"
            >
              <InputField
                icon={Mail}
                label="Email"
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
              />
              <InputField
                icon={Phone}
                label="Mobile"
                type="tel"
                value={personalInfo.mobile}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, mobile: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Update Contact Information
              </button>
            </form>
          </ProfileSection>

          <ProfileSection
            title="Home Address"
            icon={Home}
            isExpanded={expandedSection === "address"}
            onToggle={() =>
              setExpandedSection(expandedSection === "address" ? "" : "address")
            }
          >
            <form onSubmit={handleUpdateAddress} className="space-y-4">
              <input
                type="text"
                placeholder="Street Address"
                value={address.streetNo || ""}
                onChange={(e) =>
                  setAddress({ ...address, streetNo: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <input
                type="text"
                placeholder="Building Name"
                value={address.buildingName || ""}
                onChange={(e) =>
                  setAddress({ ...address, buildingName: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={address.city || ""}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="rounded-lg border-gray-200 bg-white"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state || ""}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  className="rounded-lg border-gray-200 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={address.pincode || ""}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="rounded-lg border-gray-200 bg-white"
                />
                <input
                  type="text"
                  placeholder="Locality"
                  value={address.locality || ""}
                  onChange={(e) =>
                    setAddress({ ...address, locality: e.target.value })
                  }
                  className="rounded-lg border-gray-200 bg-white"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Update Address
                </button>
                {address.streetNo && (
                  <button
                    type="button"
                    onClick={handleDeleteAddress}
                    className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </ProfileSection>

          <ProfileSection
            title="Payment Method"
            icon={CreditCard}
            isExpanded={expandedSection === "payment"}
            onToggle={() =>
              setExpandedSection(expandedSection === "payment" ? "" : "payment")
            }
          >
            <form onSubmit={handleUpdateCard} className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                value={cardInfo.cardNumber}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={cardInfo.cardValidity}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cardValidity: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardInfo.cardCVV}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cardCVV: e.target.value })
                }
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Update Payment Information
              </button>
            </form>
          </ProfileSection>

          <ProfileSection
            title="Security"
            icon={Lock}
            isExpanded={expandedSection === "security"}
            onToggle={() =>
              setExpandedSection(
                expandedSection === "security" ? "" : "security"
              )
            }
          >
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <input
                type="text"
                name="mobileId"
                placeholder="Mobile ID"
                required
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                required
                className="w-full rounded-lg border-gray-200 bg-white"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Change Password
              </button>
            </form>
          </ProfileSection>
        </div>

        <div className="mt-8">
          <button
            onClick={handleDeleteAccount}
            className="w-full py-2 px-4 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCusto;
