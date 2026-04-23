import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CollectionsPage() {
  const navigate = useNavigate();

  // 🧪 MOCK COLLECTIONS (FRONT ONLY)
  const [collections, setCollections] = useState([
    {
      _id: "1",
      title: "Summer Collection",
      description: "Light and natural ceramic pieces inspired by summer",
      image: "/example.png",
      productsCount: 12,
    },
    {
      _id: "2",
      title: "Winter Collection",
      description: "Warm tones and earthy textures",
      image: "/example.png",
      productsCount: 8,
    }
  ]);

  // DELETE (FRONT ONLY)
  const handleDelete = (id) => {
    setCollections(collections.filter((c) => c._id !== id));
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
        Collections
      </h1>

      {/* HEADER ACTION */}
      <div className="flex justify-end mb-6">

        <button
          onClick={() => navigate("/create-collection")}
          className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
        >
          + Add New Collection
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">

          {/* HEAD */}
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {collections.map((col, index) => (
              <tr key={col._id} className="border-b">

                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3 font-medium">
                  {col.title}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {col.description}
                </td>

                <td className="px-4 py-3">
                  {col.productsCount}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => navigate(`/view-collection/${col._id}`)}
                      className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/edit-collection/${col._id}`)}
                      className="px-3 py-1 text-xs bg-blue-200 rounded hover:bg-blue-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(col._id)}
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

export default CollectionsPage;