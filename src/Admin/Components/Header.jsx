import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import user from "../pics/user.jpg";

function Header({ setIsConnected, adminName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsConnected(false);
    localStorage.removeItem("isConnected");
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: implement global search logic
    console.log("Search query:", searchQuery);
  };

  const displayName = adminName || localStorage.getItem("adminName") || "Admin";

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#884B2C] focus:ring-opacity-60 transition"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </form>

      {/* User avatar + dropdown */}
      <div className="relative" ref={dropdownRef}>
        <img
          src={user}
          alt="User avatar"
          className="w-12 h-12 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-[#884B2C] transition"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <p className="text-black italic font-bold px-2 py-1 bg-[#F4E5C8] rounded truncate">
                {displayName}
              </p>
              <hr className="my-2" />
              <button
                className="flex items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition"
                onClick={() => navigate("/settings")}
              >
                <FaCog className="mr-2" />
                Settings
              </button>
              <button
                className="flex items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition"
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
