import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function CollectionsPage() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axiosInstance.get("/admin/pubs");
        setCollections(response.data);
      } catch (err) {
        setError("Failed to fetch collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleValidationToggle = async (collectionId, isvalidated) => {
    try {
      await axiosInstance.put(`/admin/pubs/${collectionId}`, {
        isvalidated: !isvalidated,
      });

      setCollections((currentCollections) =>
        currentCollections.map((collection) =>
          collection._id === collectionId
            ? { ...collection, isvalidated: !isvalidated }
            : collection,
        ),
      );
    } catch (err) {
      setError("Failed to update collection validation.");
    }
  };

  const handleDelete = (id) => {
    setCollections((currentCollections) =>
      currentCollections.filter((collection) => collection._id !== id),
    );
  };

  const getImageUrl = (collection) => {
    const image = collection.image || collection.Image || collection.pubImage;
    if (!image) return "https://via.placeholder.com/64";
    if (image.startsWith("http")) return image;

    return `${process.env.REACT_APP_API_URL}/images${image}`;
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
          Collections
        </h1>

        <button
          onClick={() => navigate("/create-collection")}
          className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
        >
          + Add Collection
        </button>
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
                <td
                  colSpan="11"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Loading collections...
                </td>
              </tr>
            ) : collections.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No collections found.
                </td>
              </tr>
            ) : (
              collections.map((collection, index) => (
                <tr key={collection._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <img
                      className="h-16 w-16 rounded object-cover"
                      src={getImageUrl(collection)}
                      alt={collection.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/64";
                      }}
                    />
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.adress || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.rating ?? "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.category || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.state || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {collection.state === "promo"
                      ? collection.pourcentage
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={Boolean(collection.isvalidated)}
                        onChange={() =>
                          handleValidationToggle(
                            collection._id,
                            collection.isvalidated,
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/view-collection/${collection._id}`)
                        }
                        className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/edit-collection/${collection._id}`)
                        }
                        className="px-3 py-1 text-xs bg-blue-200 rounded hover:bg-blue-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(collection._id)}
                        className="px-3 py-1 text-xs bg-red-200 rounded hover:bg-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CollectionsPage;
