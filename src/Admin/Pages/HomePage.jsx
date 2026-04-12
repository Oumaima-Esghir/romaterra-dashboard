import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from '../pics/bg.png';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

function HomePage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        // Start loading
        setLoading(true);
        // Make an API call to fetch publications
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/pubs`);
        // Update the state with the fetched data
        setPublications(response.data);
        // Set loading to false as data fetching is done
        setLoading(false);
      } catch (err) {
        // If there's an error, set the error state
        setError('Failed to fetch publications.');
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchPublications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter deals and promotions
  const dealsCount = publications.filter(pub => pub.state === "offre").length;
  const promotionsCount = publications.filter(pub => pub.state === "promo").length;

  // Aggregate category data for Doughnut chart
  const categories = publications.reduce((acc, pub) => {
    const category = pub.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  console.log("Category Distribution:", categories);
  // Convert category data to chart format
  const doughnutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Publication Distribution by Category",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",  // Blue
          "rgba(255, 206, 86, 0.5)",  // Yellow
          "rgba(75, 192, 192, 0.5)",  // Green
          "rgba(255, 99, 132, 0.5)",  // Pink
          "rgba(153, 102, 255, 0.5)", // Purple
          "rgba(255, 165, 0, 0.5)",   // Orange
          "rgba(255, 99, 71, 0.5)"    // Red (new)
      ],
      borderColor: [
          "rgba(54, 162, 235, 1)",    // Blue
          "rgba(255, 206, 86, 1)",    // Yellow
          "rgba(75, 192, 192, 1)",    // Green
          "rgba(255, 99, 132, 1)",    // Pink
          "rgba(153, 102, 255, 1)",   // Purple
          "rgba(255, 140, 0, 1)",     // Darker Orange
          "rgba(255, 69, 0, 1)"       // Darker Red (new)
      ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ["Deals", "Promotions"],
    datasets: [
      {
        label: "Number of Publications",
        data: [dealsCount, promotionsCount],
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Line chart data (placeholder data for demonstration)
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Publications Over Time",
        data: [65, 59, 80, 81, 56, 55, 50], // You would replace this with real time-based data
        fill: false,
        backgroundColor: "rgba(46, 134, 198, 0.5)",
        borderColor: "rgb(25, 118, 210)",
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    <div className="p-6 max-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Discover Exciting Deals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Top Restaurant Offers
          </h2>
          <p className="text-2xl font-bold text-blue-900">
            {dealsCount} Exclusive Deals
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Travel Experiences
          </h2>
          <p className="text-2xl font-bold text-blue-900">
            {promotionsCount} Amazing Discounts
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Exclusive Promotions
          </h2>
          <p className="text-2xl font-bold text-blue-900">
            {promotionsCount} Limited Time Offers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full max-w-4xl">
        {/* Bar Chart */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Current Deal Trends
          </h2>
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Deal Distribution by Category
          </h2>
          <div className="h-72">
            <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "top" } } }} />
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Deal Growth Over Time
        </h2>
        <div className="h-72">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
