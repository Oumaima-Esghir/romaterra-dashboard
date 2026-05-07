import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import CreateCategory from "../Components/create-category.jsx";
import CreateProduct from "../Components/create-product.jsx";

function CategoriesPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch categories and products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoriesList = useMemo(() => {
    const categories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(categories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleValidationToggle = async (pubId, isvalidated) => {
    try {
      await axiosInstance.put(`/admin/pubs/${pubId}`, {
        isvalidated: !isvalidated,
      });

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === pubId
            ? { ...product, isvalidated: !isvalidated }
            : product
        )
      );
    } catch (err) {
      setError("Failed to update product validation.");
    }
  };

  const getImageUrl = (product) => {
    if (!product.pubImage) return "https://via.placeholder.com/64";
    if (product.pubImage.startsWith("http")) return product.pubImage;

    return `${process.env.REACT_APP_API_URL}/images${product.pubImage}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1
          style={{
            fontFamily: "'Style Script', cursive",
            fontSize: "32px",
            color: "#884B2C",
          }}
        >
          Categories & Products
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateCategory(true)}
            className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
          >
            + Add Category
          </button>

          <button
            onClick={() => setShowCreateProduct(true)}
            className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
          >
            + Add New Product
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categoriesList.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md border text-sm ${
              selectedCategory === category
                ? "bg-[#A2664E] text-white border-[#A2664E]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">State</th>
              <th className="px-4 py-3 text-left">Percentage</th>
              <th className="px-4 py-3 text-center">Validated</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="px-4 py-6 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="11" className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>

                  <td className="px-4 py-3">
                    <img
                      className="h-16 w-16 rounded object-cover"
                      src={getImageUrl(product)}
                      alt={product.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/64";
                      }}
                    />
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.adress || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.rating ?? "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.state || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.state === "promo" ? product.pourcentage : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={Boolean(product.isvalidated)}
                        onChange={() =>
                          handleValidationToggle(product._id, product.isvalidated)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showCreateCategory && (
        <CreateCategory
          onClose={() => setShowCreateCategory(false)}
          onAddCollection={() => setShowCreateCategory(false)}
        />
      )}
      {showCreateProduct && (
        <CreateProduct
          onClose={() => setShowCreateProduct(false)}
          onAddCollection={() => setShowCreateProduct(false)}
        />
      )}
    </div>
  );
}

export default CategoriesPage;
