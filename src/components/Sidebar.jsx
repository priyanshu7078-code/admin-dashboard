import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaPhone,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaEnvelope,
  FaCreditCard,
} from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user"; // Default to user

  // ✅ Define menu items
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Lead Management", path: "/leads", icon: <FaChartBar /> },
    { name: "Contact Management", path: "/contacts", icon: <FaPhone /> },
    { name: "Employee", path: "/employees", icon: <MdGroups /> },
    { name: "Property", path: "/property", icon: <FaBuilding /> },
    { name: "Tasks", path: "/tasks", icon: <FaClipboardList /> },
    { name: "Meeting", path: "/meeting", icon: <FaUsers /> },
    { name: "Calls", path: "/calls", icon: <BiSolidPhoneCall /> },
    { name: "Emails", path: "/emails", icon: <FaEnvelope /> },
    { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    // ✅ Conditional items based on role
    ...(role === "admin" ? [
      { name: "Manage Admins", path: "/manage-admins", icon: <FaCreditCard /> },
      { name: "Manage Managers", path: "/manage-managers", icon: <FaCreditCard /> },
    ] : role === "manager" ? [
      { name: "Manage Managers", path: "/manage-managers", icon: <FaCreditCard /> }
    ] : []),
    { name: "Documents", path: "/documents", icon: <HiOutlineDocumentText /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 overflow-y-auto transition-transform duration-300 transform pt-20 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="p-4 space-y-5">
        {menuItems.map(({ name, path, icon }) => (
          <li key={name}>
            <Link
              to={path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                location.pathname === path
                  ? "bg-purple-100 text-purple-700 font-bold "
                  : "hover:bg-purple-200  text-gray-700 font-semibold"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
