import React, { useState, useEffect } from "react";
import axios from "axios";

function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/pubs`);
        setPublications(response.data);
      } catch (err) {
        setError("Failed to fetch publications.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleValidationToggle = async (pubId, isvalidated) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/pubs/${pubId}`, {
        isvalidated: !isvalidated
      });
      // Refresh the list of publications
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/pubs`);
      setPublications(response.data);
    } catch (err) {
      setError("Failed to update publication validation.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">#</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Image</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Title</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Address</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Rating</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Category</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">State</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Percentage</th>
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Validated</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={publication._id} className="border-b">
              <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <img
                  className="h-16 w-16 rounded"
                  src={`${process.env.REACT_APP_API_URL}/images${publication.pubImage}`}
                  alt={publication.title}
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{publication.title}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{publication.description}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{publication.adress || "N/A"}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{publication.rating}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{publication.category}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{publication.state}</td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {publication.state === "promo" ? publication.pourcentage : "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={publication.isvalidated}
                    onChange={() => handleValidationToggle(publication._id, publication.isvalidated)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicationsPage;
