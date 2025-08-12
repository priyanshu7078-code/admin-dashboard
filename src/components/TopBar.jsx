import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaCog, FaHome, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import userIcon from "../assets/user-round.svg";
import logo from "../assets/realstate_Logo.svg";
import axios from "axios";

export default function Topbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogout = () => {

    axios.delete("http://localhost:5000/user/logout",{withCredentials:true})
    .then((res)=>{
      console.log(res);
      
    }).catch((err)=>{
      console.log(err);
    })
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white h-20 px-4 sm:px-6 shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-auto"
        />
        <button
          onClick={onMenuClick}
          aria-label="Toggle menu"
          className="bg-purple-100 text-purple-700 p-2 rounded-lg hover:bg-purple-300 hover:text-white transition-colors duration-200"
        >
          <FaBars className="text-lg" />
        </button>
      </div>

      {/* Right: Profile Settings Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-full text-white transition-all duration-200"
        >
          <img
            src={userIcon}
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <FaCog className="text-white text-sm" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl z-50 p-6">
            <div className="mb-4">
              <p className="text-lg text-gray-500">Welcome Back</p>
              <p className="font-semibold text-lg">{user?.name || "Guest"}</p>
              <p className="text-lg text-gray-500">{user?.email || "No email"}</p>
            </div>
            <ul className="space-y-5">
              <li
                className="flex items-center gap-5 text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <FaHome /> <span>Home</span>
              </li>
              <li
                className="flex items-center gap-5 text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => handleNavigation("/profile-settings")}
              >
                <FaUserCog /> <span>Profile Settings</span>
              </li>
              <li
                className="flex items-center gap-5 text-gray-700 hover:text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
