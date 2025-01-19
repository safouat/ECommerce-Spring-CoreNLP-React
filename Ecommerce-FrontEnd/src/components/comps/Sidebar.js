import React from "react";
import { Package, PlusCircle, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [activeItem, setActiveItem] = React.useState("products");

  const menuItems = [
    {
      id: "products",
      label: "My Products",
      icon: <Package size={20} />,
      href: "/DashboardProducts",
    },
    {
      id: "add-products",
      label: "Add Products",
      icon: <PlusCircle size={20} />,
      href: "/AddProduct",
    },
    {
      id: "personal-info",
      label: "Personal Information",
      icon: <User size={20} />,
      href: "/ProfileCusto",
    },
    {
      id: "Home",
      label: "Home",
      icon: <User size={20} />,
      href: "/",
    },
  ];

  return (
    <div className="h-screen w-72 bg-blue-900 text-white flex flex-col shadow-lg">
      {/* Logo/Brand Area */}
      <div className="p-6 border-b border-blue-800 flex items-center space-x-3">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href} // Use Link for navigation
            className={`
              flex items-center px-6 py-3 text-sm
              transition-colors duration-200 rounded-lg
              ${
                activeItem === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-blue-700"
              }
            `}
            onClick={() => {
              setActiveItem(item.id);
            }}
          >
            <span className="inline-flex items-center justify-center w-8">
              {item.icon}
            </span>
            <span className="ml-4">{item.label}</span>
            <ChevronRight
              size={16}
              className={`ml-auto transition-transform duration-200
                ${activeItem === item.id ? "rotate-90" : ""}
              `}
            />
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
