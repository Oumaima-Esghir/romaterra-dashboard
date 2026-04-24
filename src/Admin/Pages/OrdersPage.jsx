import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const publications = [
    {
      pubImage:
        "https://tophome.tn/upload/a32ca9999d25dd2343981e31c9c071a5.JPG", // Placeholder image URL
      title: "New Features in React 18",
      description: "An in-depth look at the new features in React 18.",
      address: "123 React St, JavaScript City",
      rating: 4.5,
      category: "Tech",
      state: "Promo", // Could be 'Promo' or 'Regular'
      percentage: "20%",
      isValidated: true,
      postedDate: "2024-08-01",
      author: "Jane Doe",
    },
    {
      pubImage: "https://via.placeholder.com/100",
      title: "Understanding Tailwind CSS",
      description: "A comprehensive guide to using Tailwind CSS.",
      address: "456 CSS Ave, Styling Town",
      rating: 4.2,
      category: "Design",
      state: "Regular",
      percentage: "0%",
      isValidated: false,
      postedDate: "2024-07-25",
      author: "John Smith",
    },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        /* const response = await axiosInstance.get(`/admin/users`);
        setOrders(response.data); */
        setOrders(publications);
      } catch (err) {
        setError("There was an error fetching the Orders!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/admin/orders/delete/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the order!", error);
      alert(
        `Failed to delete the order: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div>
      <div className="overflow-x-auto p-4">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1
            style={{
              fontFamily: "'Style Script', cursive",
              fontSize: "32px",
              color: "#884B2C",
            }}
          >
            Our Orders
          </h1>

          <button
            //onClick={() => navigate("/create-collection")}
            className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
          >
            + Add Order
          </button>
        </div>
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
                <th className="px-4 py-3 text-center">Percentage</th>
                <th className="px-4 py-3 text-center">Validated</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{index + 1 || 1}</td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      {order.pubImage ? (
                        <img
                          src={order.pubImage}
                          alt="Order Image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.title || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.description || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.address || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.rating || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.category || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.state || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.percentage || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <input
                        type="checkbox"
                        checked={order.isValidated}
                        readOnly
                      />
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
