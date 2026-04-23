import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

import CreateCategory from "./Pages/create-category";

import CreateCollection from "./Pages/create-collection";
import ViewCollection from "./Pages/view-collection";
import EditCollection from "./Pages/edit-collection";


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
            path="/collections"
            element={<CollectionsPage />}
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
