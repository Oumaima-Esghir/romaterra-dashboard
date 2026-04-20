import React, { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import UserDetailPage from "./Pages/UserDetailPage";
import CollectionsPage from "./Pages/CollectionsPage";
import ProductsPage from "./Pages/ProductsPage";
import CategoriesPage from "./Pages/CategoriesPage";

// Protects a route: redirects to /login if not authenticated
function ProtectedRoute({ isConnected, children }) {
  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminPanel() {
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
            path="/products"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute isConnected={isConnected}>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all: redirect unknown paths */}
          <Route
            path="*"
            element={<Navigate to={isConnected ? "/home" : "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
