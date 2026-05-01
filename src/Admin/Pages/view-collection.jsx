import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🧪 MOCK COLLECTION
const collection = {
  _id: "1",
  title: "Summer Collection",
  description:
    "A light and natural ceramic collection inspired by summer tones and textures.",
  image: "/example.png",
  products: [
    {
      _id: "1",
      name: "Ceramic Vase",
      price: "120 TND",
      image: "/example.png"
    },
    {
      _id: "2",
      name: "Clay Mug",
      price: "45 TND",
      image: "/example.png"
    }
  ]
};

function ViewCollection() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("Viewing collection ID:", id);
    // 🔌 later: axios.get(`/collections/${id}`)
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
        Collection Details
      </h1>

      {/* MAIN CARD */}
      <div className="bg-white shadow-md rounded-lg p-6 border">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* IMAGE */}
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full md:w-64 h-64 object-cover rounded-lg border"
          />

          {/* INFO */}
          <div className="flex flex-col justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#884B2C] mb-2">
                {collection.title}
              </h2>

              <p className="text-gray-600 mb-3">
                {collection.description}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => navigate(`/edit-collection/${collection._id}`)}
                className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => navigate("/collections")}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Back
              </button>

            </div>

          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="mt-8">

          <h3 className="text-lg font-semibold text-[#884B2C] mb-4">
            Products in this collection
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {collection.products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-3 hover:shadow transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />

                <p className="text-sm font-medium">
                  {product.name}
                </p>

                <p className="text-xs text-gray-600">
                  {product.price}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewCollection;