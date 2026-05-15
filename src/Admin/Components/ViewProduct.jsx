import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./FormProduct.jsx";

function ViewProduct({ product, onClose }) {
  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState(false);

  const HandelEditProduct = () => {
    setEditProduct(true);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden 
      bg-white/30 backdrop-blur-sm transition-transform z-50"
    >
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 border">
        {/* TITLE */}
        <h1
          className="mb-6 text-center"
          style={{
            fontFamily: "'Style Script', cursive",
            fontSize: "32px",
            color: "#884B2C",
          }}
        >
          Product Details
        </h1>
        {/* MAIN CARD */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IMAGES */}
          <div className="flex flex-col gap-4">
            <img
              src={product.images[0]}
              alt="product"
              className="w-full h-80 object-cover rounded-lg border"
            />

            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-4">
            {/* NAME */}
            <h2 className="text-2xl font-bold text-[#884B2C]">
              {product.name}
            </h2>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              {product.status === "Promo" ? (
                <>
                  <p className="text-gray-400 line-through text-lg">
                    {product.price} TND
                  </p>

                  <p className="text-xl font-bold text-[#A2664E]">
                    {product.promoPrice} TND
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-[#A2664E]">
                  {product.price} TND
                </p>
              )}
            </div>

            {/* STATUS BADGE */}
            <div>
              {product.status === "Promo" && (
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                  PROMO
                </span>
              )}

              {product.status === "Available" && (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  AVAILABLE
                </span>
              )}

              {product.status === "Out of Stock" && (
                <span className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs">
                  OUT OF STOCK
                </span>
              )}
            </div>

            {/* DETAILS */}
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Collection:</strong> {product.collection}
              </p>
              <p>
                <strong>Size:</strong> {product.size}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantityInStock}
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => HandelEditProduct()}
                className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => onClose()}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <CreateProduct
          onClose={() => setEditProduct(false)}
          onAddCollection={() => setEditProduct(false)}
          product={product}
        />
      )}
    </div>
  );
}

export default ViewProduct;
