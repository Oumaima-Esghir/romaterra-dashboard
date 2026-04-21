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
        <h1 className="mb-4 py-4 text-sm text-center font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
          Our
          <span className="ml-2 underline underline-offset-3 decoration-4 decoration-blue-400">
            Orders
          </span>
        </h1>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                style={{ width: "100px", height: "100px" }}
              >
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Rating
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                State
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Percentage
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Validated
              </th>
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
                  <td className="px-4 py-2 text-sm">{order.title || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">
                    {order.description || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {order.address || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm">{order.rating || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">
                    {order.category || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm">{order.state || "N/A"}</td>
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
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
