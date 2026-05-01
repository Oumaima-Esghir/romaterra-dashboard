import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🧠 MOCK PRODUCT (OUTSIDE COMPONENT → FIXES ESLINT WARNING)
const mockProduct = {
  _id: "1",
  name: "Ceramic Vase",
  description: "Handmade ceramic vase with natural texture",
  price: "120",
  promoPrice: "96",
  size: "23×10 cm",
  category: "Decoration",
  collection: "Summer Collection",
  state: "promo",
  qty: 5
};

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = ["Decoration", "Mugs", "Plates", "Bowls"];
  const collections = ["Summer Collection", "New Arrival", "Best Sellers"];

  const [form, setForm] = useState(mockProduct);
  const [images, setImages] = useState([]);

  // LOAD PRODUCT
  useEffect(() => {
    // 🧠 later replace with API:
    // axios.get(`/product/${id}`)
    setForm(mockProduct);
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGES
  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  // UPDATE PRODUCT
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...form,
      images
    };

    console.log("UPDATED PRODUCT:", updatedProduct);

    // navigate back
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
        Edit Product
      </h1>

      {/* FORM CARD */}
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 border">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="px-4 py-3 border rounded-md focus:border-[#A2664E] outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="px-4 py-3 border rounded-md focus:border-[#A2664E] outline-none"
          />

          {/* PRICE + PROMO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="px-4 py-3 border rounded-md"
            />

            <input
              type="text"
              name="promoPrice"
              value={form.promoPrice}
              onChange={handleChange}
              placeholder="Promo Price"
              className="px-4 py-3 border rounded-md"
            />

          </div>

          {/* SIZE + QTY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Size"
              className="px-4 py-3 border rounded-md"
            />

            <input
              type="number"
              name="qty"
              value={form.qty}
              onChange={handleChange}
              placeholder="Quantity"
              className="px-4 py-3 border rounded-md"
            />

          </div>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* COLLECTION */}
          <select
            name="collection"
            value={form.collection}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md"
          >
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
            className="px-4 py-3 border rounded-md"
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

          {/* IMAGE PREVIEW */}
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
              Update Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditProduct;