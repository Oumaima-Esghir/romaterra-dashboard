import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../pics/bg.png";
import axiosInstance from "../../api/axiosInstance";

function UserDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/admin/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching user details.");
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  const userImageUrl = user?.image
    ? `${process.env.REACT_APP_API_URL}/images/${user.image}`
    : "https://via.placeholder.com/150";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4" style={{ backgroundColor: "#93C2E5" }}>
          <h1 className="text-white text-center font-bold text-xl">
            User Details
          </h1>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <img
              className="h-24 w-24 rounded-full border-4 border-[#93C2E5] object-cover"
              src={userImageUrl}
              alt={user.username || "User"}
            />
          </div>

          {[
            { label: "Username", value: user.username },
            { label: "Email", value: user.email },
            { label: "Age", value: user.age },
            { label: "Address", value: user.adress || "N/A" },
          ].map(({ label, value }) => (
            <div key={label} className="mb-4 border-b pb-2">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                {label}
              </p>
              <p className="text-gray-900 mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
