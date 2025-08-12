import { useState, useEffect } from "react";
import axios from "axios";
import AdminForm from "../components/AdminForm";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch admins from backend on mount — fixed .get() syntax
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/newAdmin", {
        withCredentials: true,
      })
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error("Failed to fetch admins:", err));
  }, []);

  // Handle adding new admin
  const handleAddAdmin = async (adminData) => {
    // console.log(adminData);
    try {
      const response = await axios.post("http://localhost:5000/user/newAdmin", adminData, {
        withCredentials: true,
      });
      console.log(response.data)
      const savedAdmin = response.data;
      setAdmins((prev) => [...prev, savedAdmin]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save admin:", error);
      alert("Something went wrong while adding the admin.");
    }
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Admin
          </button>
        </div>

        {admins.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                {/* <th className="p-3 text-left">Phone</th> */}
                <th className="p-3 text-left">Email</th>
                {/* <th className="p-3 text-left">Password</th> */}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.role}</td>
                  {/* <td className="p-3">{admin.number}</td> */}
                  <td className="p-3">{admin.email}</td>
                  {/* <td className="p-3">{admin.password}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No admins added yet.</p>
        )}
      </div>

      {showModal && (
        <AdminForm
          onSave={handleAddAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
