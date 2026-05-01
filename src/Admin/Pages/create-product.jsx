import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();

  // 🧠 CATEGORY LIST
  const categories = ["Decoration", "Mugs", "Plates", "Bowls"];

  // 🧠 COLLECTION LIST (TEMP — later replace with API from your collection page)
  const collections = [
    "Summer Collection",
    "New Arrival",
    "Best Sellers",
    "Handmade Collection"
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    promoPrice: "",
    size: "",
    category: "",
    collection: "",
    state: "available",
    qty: ""
  });

  const [images, setImages] = useState([]);

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      images
    };

    // 🧠 API CALL LATER
    console.log("PRODUCT CREATED:", productData);

    navigate("/categories");
  };

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
        Create Product
      </h1>

      {/* FORM CARD */}
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 border">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
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
              type="text"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
            />

            <input
              type="text"
              name="promoPrice"
              placeholder="Promo price (optional)"
              value={form.promoPrice}
              onChange={handleChange}
              className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
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
              name="qty"
              placeholder="Quantity"
              value={form.qty}
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
            name="state"
            value={form.state}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none focus:border-[#A2664E]"
          >
            <option value="available">Available</option>
            <option value="promo">Promo</option>
            <option value="out-of-stock">Out of Stock</option>
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
              onClick={() => navigate("/categories")}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
            >
              Create Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateProduct;