import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function CreateProduct({ onClose, onAddCollection, product }) {
  const navigate = useNavigate();

  // 🧠 CATEGORY LIST
  const categories = ["Decoration", "Mugs", "Plates", "Bowls"];

  // 🧠 COLLECTION LIST (TEMP — later replace with API from your collection page)
  const collections = [
    "Summer Collection",
    "New Arrival",
    "Best Sellers",
    "Handmade Collection",
  ];

  const [form, setForm] = useState({
    images: [],
    name: "",
    description: "",
    price: null,
    promoPrice: null,
    quantityInStock: null,
    size: "",
    category: null,
    collection: null,
    status: "Available",
  });

  const [images, setImages] = useState([]);

  // INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
      ...(name === "status" && value !== "Promo" ? { promoPrice: null } : {}),
    }));
  };

  // IMAGES HANDLER
  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      images,
    };

    // 🧠 API CALL LATER
    axiosInstance
      .post("/products/", productData)
      .then((response) => {
        console.log("Product created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
    console.log("PRODUCT CREATED:", productData);

    navigate("/categories");
  };

  useEffect(() => {
    if (product) {
      setForm({
        images: [],
        name: product.name,
        description: product.description,
        price: product.price,
        promoPrice: product.promoPrice,
        quantityInStock: product.quantityInStock,
        size: product.size,
        category: product.category,
        collection: product.collection,
        status: product.status,
      });
    }
  }, [product]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden 
      bg-white/30 backdrop-blur-sm transition-transform z-50"
    >
      {/* FORM CARD */}
      <div className="flex flex-col w-full max-w-3xl bg-white shadow-md rounded-lg p-6 border">
        {/* TITLE */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "'Style Script', cursive",
            fontSize: "32px",
            color: "#884B2C",
          }}
        >
          {product ? "Edit" : "Create"} Product
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Product description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
          />

          {/* PRICE + PROMO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
              required
            />

            <input
              type="number"
              name="promoPrice"
              placeholder="Promo price (optional)"
              value={form.promoPrice}
              onChange={handleChange}
              disabled={form.status !== "Promo"}
              className={`px-4 py-3 border rounded-md outline-none focus:border-[#A2664E] ${
                form.status !== "Promo"
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : ""
              }`}
            />
          </div>

          {/* SIZE + QTY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="size"
              placeholder="Size (e.g. 23×10 cm)"
              value={form.size}
              onChange={handleChange}
              className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
            />

            <input
              type="number"
              name="quantityInStock"
              placeholder="Quantity in Stock"
              value={form.quantityInStock}
              onChange={handleChange}
              className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
            />
          </div>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* COLLECTION (IMPORTANT PART) */}
          <select
            name="collection"
            value={form.collection}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
          >
            <option value="">Select Collection</option>
            {collections.map((col, i) => (
              <option key={i} value={col}>
                {col}
              </option>
            ))}
          </select>

          {/* STATE */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
          >
            <option value="Available">Available</option>
            <option value="Promo">Promo</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={handleImages}
            className="w-full"
          />

          {/* PREVIEW */}
          {images.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="w-20 h-20 object-cover rounded border"
                  alt="preview"
                />
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              onSubmit={handleSubmit}
              className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
            >
              {product ? "Edit" : "Create"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
