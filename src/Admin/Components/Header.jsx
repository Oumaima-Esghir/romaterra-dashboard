import React, { useState } from "react";
import { FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import user from "../pics/user.jpg";

function Header({ setIsConnected }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear connection state and remove from localStorage
    setIsConnected(false);
    localStorage.removeItem("isConnected");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
           className="pl-10 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#884B2C] focus:ring-opacity-60 transition"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <div className="relative cursor-pointer">
        <img
          src={user} 
          alt="User"
          className="w-12 h-12 rounded-full cursor-pointer border border-gray-300"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
              <p className="text-black italic font-bold px-2 bg-[#F4E5C8]">
                Firas ElAbed
              </p>
              <hr className="my-2" />
              <button
                className="flex items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                onClick={() => alert("Settings clicked")}
              >
                <FaCog className="mr-2" />
                Settings
              </button>
              <button
                className="flex items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
