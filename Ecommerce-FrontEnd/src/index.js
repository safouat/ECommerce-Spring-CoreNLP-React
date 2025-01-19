import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/App.css";
import App from "./App";
import Login from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import reportWebVitals from "./reportWebVitals"; // Update the import path
import Blog from "./components/Blogs/Blog";
import Blogs from "./components/Blogs/Blogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Header from "./components/comps/header";
import Home from "./components/comps/home";
import Appointement from "./components/Appointement/Appointement";
import Patients from "./components/Appointement/Patients";
import HeaderProfile from "./components/Auth/ProfileHeader";
import Edit from "./components/Auth/EditProfile";
import ManageProfile from "./components/Auth/ManageProfile";
import Quizs from "./components/Appointement/Quizs";
import ProductDetail from "./components/Blogs/Product";
import ShoppingCart from "./components/Blogs/ShoppingCart";
import ProfileCusto from "./components/Blogs/ProfileCusto";
import AddProduct from "./components/Dashboard/AddProduct";
import EditProduct from "./components/Dashboard/EditProduct";
import DashboardProducts from "./components/Dashboard/DashboardProducts";
import DashboardProductDetails from "./components/Dashboard/DashboardProductDetails";
import Dashboard from "./components/Dashboard/Dashboard";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        <Route path="/ProfileCusto" element={<ProfileCusto />}></Route>

        <Route path="/MedicalAI" element={<App />}></Route>
        <Route path="/Blog" element={<Blog />}></Route>
        <Route path="/Blogs" element={<Blogs />}></Route>
        <Route path="/Header" element={<Header />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/EditProfile" element={<Edit />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/Quiz" element={<Quizs />} />
        <Route path="/Quizs" element={<Appointement />}></Route>
        <Route path="/Patients" element={<Patients />}></Route>
        <Route path="/HeaderProfile" element={<HeaderProfile />}></Route>
        <Route path="/ManageProfile" element={<ManageProfile />}></Route>
        <Route path="/AddProduct" element={<AddProduct />}></Route>
        <Route path="/edit/:productId" element={<EditProduct />}></Route>
        <Route
          path="/DashboardProducts"
          element={<DashboardProducts />}
        ></Route>
        <Route
          path="/DashboardProductDetails/:productId"
          element={<DashboardProductDetails />}
        ></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
