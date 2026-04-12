/*import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';*/
import React from "react";

function OrdersPage() {
  /*const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all orders from the backend when the component mounts
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/admin/users`)
      .then(response => {
        setOrders(response.data);  // Set the fetched setOrders in the state
      })
      .catch(error => {
        setError("There was an error fetching the Orders!");
        console.error(error);
      });
  }, []);

  // Handle Orders deletion
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/orders/delete/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));  // Remove the deleted user from the state
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the order!", error);
      alert(`Failed to delete the order: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="mb-4 py-4 text-sm text-center font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
          Our
          <span className="ml-2 underline underline-offset-3 decoration-4 decoration-blue-400">
            Orders
          </span>
        </h1>

        {error && <p className="text-red-500">{error}</p>}  
        // Display error message if any

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          ...
        </table>
      </div>
    </div>
  );
  */

  const publications = [
    {
      pubImage: "https://via.placeholder.com/100", // Placeholder image URL
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

  return (
    <div className="p-4">
      <h1 className="mb-4 py-4 text-sm text-center font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
        Our
        <span className="ml-2 underline underline-offset-3 decoration-4 decoration-blue-400">
          Publications
        </span>
      </h1>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100">#</th>
            <th className="px-4 py-2 bg-gray-100">Image</th>
            <th className="px-4 py-2 bg-gray-100">Title</th>
            <th className="px-4 py-2 bg-gray-100">Description</th>
            <th className="px-4 py-2 bg-gray-100">Address</th>
            <th className="px-4 py-2 bg-gray-100">Rating</th>
            <th className="px-4 py-2 bg-gray-100">Category</th>
            <th className="px-4 py-2 bg-gray-100">State</th>
            <th className="px-4 py-2 bg-gray-100">Percentage</th>
            <th className="px-4 py-2 bg-gray-100">Validated</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <img className="h-16 w-16 rounded" src={publication.pubImage} alt={publication.title} />
              </td>
              <td className="px-4 py-2">{publication.title}</td>
              <td className="px-4 py-2">{publication.description}</td>
              <td className="px-4 py-2">{publication.address}</td>
              <td className="px-4 py-2">{publication.rating}</td>
              <td className="px-4 py-2">{publication.category}</td>
              <td className="px-4 py-2">{publication.state}</td>
              <td className="px-4 py-2">{publication.percentage}</td>
              <td className="px-4 py-2">
                <input type="checkbox" checked={publication.isValidated} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
