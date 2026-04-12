import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import HomePage from "../Admin/Pages/HomePage";
import LoginPage from "../Admin/Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import UserDetailPage from "../Admin/Pages/UserDetailPage";
import CollectionsPage from "./Pages/CollectionsPage";
import ProductsPage from "./Pages/CollectionsPage";
import CategoriesPage from "./Pages/CategoriesPage";

function AdminPannel() {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("isConnected") === "true"
  );
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  React.useEffect(() => {
    localStorage.setItem("isConnected", isConnected);
  }, [isConnected]);

  return (
    <div className="flex">
      {/* Conditionally render Sidebar and Header */}
      {!isLoginPage && <Sidebar />}
      <div className="flex-grow">
        {!isLoginPage && <Header setIsConnected={setIsConnected} />}
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsConnected={setIsConnected} />}
          />
          <Route
            path="/home"
            element={isConnected ? <HomePage /> : <LoginPage />}
          />
          <Route
            path="/orders"
            element={isConnected ? <OrdersPage /> : <LoginPage />}
          />
          <Route
            path="/users/:userId" // Route for user details
            element={isConnected ? <UserDetailPage /> : <LoginPage />}
          />
         
          <Route
            path="/collections"
            element={isConnected ? <CollectionsPage /> : <LoginPage />}
          />
         <Route
            path="/products"
            element={isConnected ? <ProductsPage /> : <LoginPage />}
          />
          <Route
            path="/categories"
            element={isConnected ? <CategoriesPage /> : <LoginPage />}
          />
          </Routes>
      </div>
    </div>
  );
}

export default AdminPannel;
