import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import CreateCategory from "../Components/Create-category.jsx";
import CreateProduct from "../Components/Create-product.jsx";
import ViewProduct from "../Components/View-product.jsx";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import ConfirmAlert from "../Components/ConfirmAlert.jsx";

function CategoriesPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const fetchProducts = useCallback(async ({ showLoader = true } = {}) => {
    if (showLoader) setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get("/products/");
      setProducts(response.data);
      console.log("Fetched products:", response.data);
    } catch (err) {
      setError("Failed to fetch categories and products.");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  const productView = (p) => {
    setProduct(p);
    setShowProduct(true);
    console.log("Viewing product:", p);
  };

  const productEdit = (p) => {
    setProduct(p);
    setEditProduct(true);
    console.log("Editing product:", p);
  };

  const productDelete = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      console.log("Deleted product:", response.data);
      await fetchProducts({ showLoader: false });
    } catch (err) {
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  /*  const getImageUrl = (product) => {
    if (!product.pubImage) return "https://via.placeholder.com/64";
    if (product.pubImage.startsWith("http")) return product.pubImage;

    return `${process.env.REACT_APP_API_URL}/images${product.pubImage}`;
  }; */

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
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Price Promo</th>
              <th className="px-4 py-3 text-left">Sizes</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Collection</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <img
                      className="h-16 w-16 rounded object-cover"
                      //src={getImageUrl(product)}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/64";
                      }}
                    />
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-sm">
                    {product.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.price?.toLocaleString() + " DT" || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.promoPrice
                      ? product.promoPrice.toLocaleString() + " DT"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.size || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.quantityInStock ?? "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.collection || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* STATUS BADGE */}
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
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => productView(product)}
                        className="p-1 rounded-full hover:bg-blue-100"
                      >
                        <Eye className="h-5 w-5 text-blue-500" />
                      </button>

                      <button
                        onClick={() => productEdit(product)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <SquarePen className="h-4 w-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => productDelete(product._id)}
                        className="p-1 rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
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

      {editProduct && (
        <CreateProduct
          onClose={() => setEditProduct(false)}
          onAddCollection={() => setEditProduct(false)}
          product={product}
        />
      )}

      {showProduct && (
        <ViewProduct product={product} onClose={() => setShowProduct(false)} />
      )}

       {/* <ConfirmAlert
        title="test"
        message="test"
      /> */}
    </div>
  );
}

export default CategoriesPage;
