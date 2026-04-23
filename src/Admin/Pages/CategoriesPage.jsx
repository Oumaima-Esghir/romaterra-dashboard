import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function CategoriesPage() {
  const navigate = useNavigate();

  // CATEGORIES
  const [categoriesList, setCategoriesList] = useState([
    "All",
    "Decoration",
    "Mugs"
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // PRODUCTS
  const products = [
    {
      _id: "1",
      title: "Ceramic Vase",
      price: "120 TND",
      size: "23×10 cm",
      category: "Decoration",
      state: "promo",
      pubImage: "/example.png"
    },
    {
      _id: "2",
      title: "Clay Mug",
      price: "45 TND",
      size: "10×8 cm",
      category: "Mugs",
      state: "offre",
      pubImage: "/example.png"
    }
  ];

  // FILTER PRODUCTS
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // DELETE CATEGORY
  const handleDeleteCategory = (cat) => {
    if (cat === "All") return;

    setCategoriesList(categoriesList.filter((c) => c !== cat));

    if (selectedCategory === cat) {
      setSelectedCategory("All");
    }
  };

  // EDIT CATEGORY
  const handleEditCategory = (oldCat) => {
    const newName = prompt("Edit category name:", oldCat);

    if (!newName || newName === oldCat) return;

    setCategoriesList(
      categoriesList.map((c) => (c === oldCat ? newName : c))
    );
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
        Categories & Products
      </h1>

      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">

        {/* CATEGORY FILTER */}
        <div className="flex gap-3 flex-wrap">

          {categoriesList.map((cat, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-[#A2664E] text-white"
                  : "bg-white text-[#884B2C] border-[#884B2C]"
              }`}
            >

              {/* CATEGORY NAME */}
              <span
                className="cursor-pointer text-sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </span>

              {/* ACTIONS (ONLY FOR NON "ALL") */}
              {cat !== "All" && (
                <div className="flex items-center gap-1 ml-1">

                  {/* EDIT */}
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className="p-1 rounded hover:bg-black/10 transition"
                  >
                    <FiEdit2 size={14} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="p-1 rounded hover:bg-red-100 transition"
                  >
                    <FiTrash2 size={14} />
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>

        {/* ADD CATEGORY */}
        <button
          onClick={() => navigate("/create-category")}
          className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
        >
          + Add Category
        </button>
      </div>

      {/* ADD PRODUCT */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/create-product")}
          className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
        >
          + Add New Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">State</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">

                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3">
                  <img
                    src={product.pubImage}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3">{product.title}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.size}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.state}</td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => navigate(`/view-product/${product._id}`)}
                      className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="px-3 py-1 text-xs bg-blue-200 rounded hover:bg-blue-300"
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 text-xs bg-red-200 rounded hover:bg-red-300"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default CategoriesPage;