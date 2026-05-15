import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import CreateOrder from "../Components/CreatOrder.jsx";

const mockOrders = [
  {
    _id: "1",
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    shippingAddress: "123 React St, JavaScript City",
    status: "pending",
    items: [{ product: { name: "Ceramic Vase" }, quantity: 2, price: 45 }],
    totalAmount: 90,
  },
  {
    _id: "2",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    shippingAddress: "456 CSS Ave, Styling Town",
    status: "paid",
    items: [{ product: { name: "Clay Mug" }, quantity: 1, price: 18 }],
    totalAmount: 18,
  },
];

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/admin/users`);
        setOrders(response.data);
        // setOrders(mockOrders);
      } catch (err) {
        setError("Failed to fetch Orders!");
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

  const handleAddOrder = (orderData) => {
    setOrders((currentOrders) => [
      {
        ...orderData,
        _id: Date.now().toString(),
      },
      ...currentOrders,
    ]);
    setShowCreateOrder(false);
  };

  const getProductName = (item) => {
    if (typeof item.product === "object")
      return item.product?.name || "Product";

    return item.product || "Product";
  };

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
            onClick={() => setShowCreateOrder(true)}
            className="px-4 py-2 bg-[#A2664E] text-white rounded-md hover:opacity-90"
          >
            + Add Order
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
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Shipping Address</th>
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
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{index + 1 || 1}</td>
                    <td className="px-4 py-2 text-sm">
                      {order.customerName || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.customerEmail || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.items?.length
                        ? order.items
                            .map(
                              (item) =>
                                `${getProductName(item)} x ${item.quantity}`,
                            )
                            .join(", ")
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.totalAmount ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className="rounded-full bg-[#F4E5C8] px-3 py-1 text-xs font-medium capitalize text-[#884B2C]">
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.shippingAddress || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center text-sm">
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
                    colSpan="8"
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
      {showCreateOrder && (
        <CreateOrder
          onClose={() => setShowCreateOrder(false)}
          onAddOrder={handleAddOrder}
        />
      )}
    </div>
  );
}

export default OrdersPage;
