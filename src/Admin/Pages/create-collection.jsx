import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCollection() {
  const navigate = useNavigate();

  // 🧪 MOCK PRODUCTS
  const productsList = [
    { _id: "1", name: "Ceramic Vase", image: "/example.png" },
    { _id: "2", name: "Clay Mug", image: "/example.png" },
    { _id: "3", name: "Handmade Plate", image: "/example.png" }
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    state: "active"
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [image, setImage] = useState(null);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // SELECT PRODUCTS
  const toggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCollection = {
      ...form,
      image,
      products: selectedProducts
    };

    console.log("NEW COLLECTION:", newCollection);

    navigate("/collections");
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
        Create Collection
      </h1>

      {/* FORM */}
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 border">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Collection name"
            value={form.title}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="px-4 py-3 border rounded-md outline-none"
          />

          {/* CUSTOM IMAGE INPUT */}
          <div className="flex items-center gap-4">

            <label className="px-4 py-2 bg-[#A2664E] text-white rounded-md cursor-pointer hover:opacity-90">
              Choose Image
              <input
                type="file"
                onChange={handleImage}
                className="hidden"
              />
            </label>

            <span className="text-sm text-gray-600">
              {image ? image.name : "No image chosen"}
            </span>

          </div>

          {/* IMAGE PREVIEW */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-32 h-32 object-cover rounded border"
            />
          )}

          {/* PRODUCTS SELECTION */}
          <div>
            <p className="mb-2 font-medium text-[#884B2C]">
              Select Products
            </p>

            <div className="border rounded-md p-3 max-h-52 overflow-y-auto">

              {productsList.map((product) => (
                <label
                  key={product._id}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer transition 
                  ${
                    selectedProducts.includes(product._id)
                      ? "bg-[#F4E5C8]"
                      : "hover:bg-gray-50"
                  }`}
                >

                  {/* CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleProduct(product._id)}
                  />

                  {/* IMAGE */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded border"
                  />

                  {/* NAME */}
                  <span className="text-sm font-medium">
                    {product.name}
                  </span>

                </label>
              ))}

            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate("/collections")}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#A2664E] text-white rounded-md"
            >
              Create Collection
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateCollection;