import React, { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

import HomePage from "../Admin/Pages/HomePage";
import LoginPage from "../Admin/Pages/LoginPage";

import OrdersPage from "./Pages/OrdersPage";
import CollectionsPage from "./Pages/CollectionsPage";
import CategoriesPage from "./Pages/CategoriesPage";

import CreateProduct from "./Pages/create-product";
import EditProduct from "./Pages/edit-product";
import ViewProduct from "./Pages/view-product";
import UserDetailPage from "./Pages/UserDetailPage";

import CreateCategory from "./Pages/create-category";

import CreateCollection from "./Pages/create-collection";
import ViewCollection from "./Pages/view-collection";
import EditCollection from "./Pages/edit-collection";

function ProtectedRoute({ isConnected, children }) {
  return isConnected ? children : <Navigate to="/login" replace />;
}

function AdminPannel() {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("isConnected") === "true"
  );
  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || ""
  );
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  React.useEffect(() => {
    localStorage.setItem("isConnected", isConnected);
  }, [isConnected]);

  return (
    <div className="flex">
      {!isLoginPage && isConnected && <Sidebar />}
      <div className="flex-grow">
        {!isLoginPage && isConnected && (
          <Header setIsConnected={setIsConnected} adminName={adminName} />
        )}
        <Routes>
          {/* Default route: redirect based on auth state */}
          <Route
            path="/"
            element={<Navigate to={isConnected ? "/home" : "/login"} replace />}
          />

          {/* Public route */}
          <Route
            path="/login"
            element={
              isConnected ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginPage setIsConnected={setIsConnected} setAdminName={setAdminName} />
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collections"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <CollectionsPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/categories"
            element={<CategoriesPage />}
          />
          {/* <Route
            path="/categories"
            element={isConnected ? <CategoriesPage /> : <LoginPage />}
          />*/}
          <Route 
          path="/create-product" 
          element={<CreateProduct />} />

          <Route
           path="/edit-product/:id" 
           element={<EditProduct
            />} />

          <Route
          path="/view-product/:id" 
          element={<ViewProduct />} />

          <Route 
          path="/create-category"
          element={<CreateCategory />} />

          <Route 
          path="/create-collection"
          element={<CreateCollection />} />
         
          <Route 
          path="/view-collection/:id" 
          element={<ViewCollection/>} />

          <Route
           path="/edit-collection/:id" 
           element={<EditCollection/>} />
        

      </Routes>
      </div>
    </div>
  );
}

export default AdminPannel;
