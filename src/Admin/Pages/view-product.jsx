import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🧠 MOCK PRODUCT (replace later with API)
const product = {
  _id: "1",
  name: "Ceramic Vase",
  description:
    "Handcrafted ceramic vase inspired by ancient artisan techniques. Each piece is unique and shaped by hand.",
  price: 120,
  promoPrice: 96,
  size: "23×10 cm",
  category: "Decoration",
  collection: "Summer Collection",
  state: "promo",
  qty: 8,
  images: ["/example.png", "/example.png", "/example.png"]
};

function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🧠 USE ID PROPERLY (fixes ESLint warning)
  useEffect(() => {
    console.log("Viewing product with ID:", id);

    // 🔌 later replace with API:
    // axios.get(`/api/products/${id}`)
  }, [id]);

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1
        className="mb-6"
        style={{
          fontFamily: "'Style Script', cursive",
          fontSize: "32px",
          color: "#884B2C",
        }}
      >
        Product Details
      </h1>

      {/* MAIN CARD */}
      <div className="max-w-5xl bg-white shadow-md rounded-lg p-6 border grid grid-cols-1 md:grid-cols-2 gap-8">

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

            {product.state === "promo" ? (
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

            {product.state === "promo" && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                PROMO
              </span>
            )}

            {product.state === "available" && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                AVAILABLE
              </span>
            )}

            {product.state === "out-of-stock" && (
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                OUT OF STOCK
              </span>
            )}

          </div>

          {/* DETAILS */}
          <div className="text-sm text-gray-700 space-y-2">

            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Collection:</strong> {product.collection}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Quantity:</strong> {product.qty}</p>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-5">

            <button
              onClick={() => navigate(`/edit-product/${product._id}`)}
              className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
            >
              Edit
            </button>

            <button
              onClick={() => navigate("/categories")}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Back
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewProduct;