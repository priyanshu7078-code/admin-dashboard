import { useState, useEffect } from "react";
import axios from "axios";
import ManagerForm from "../components/ManagerForm"; // you'll create this similar to AdminForm

export default function ManageManagers() {
  const [managers, setManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch managers from backend on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/newManager", { // <-- change API endpoint
        withCredentials: true,
      })
      .then((res) => setManagers(res.data))
      .catch((err) => console.error("Failed to fetch managers:", err));
  }, []);

  // Handle adding new manager
  const handleAddManager = async (managerData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/newManager", // <-- change API endpoint
        managerData,
        { withCredentials: true }
      );
      const savedManager = response.data;
      setManagers((prev) => [...prev, savedManager]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save manager:", error);
      alert("Something went wrong while adding the manager.");
    }
  };   

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manager Management</h1> 
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Manager
          </button>  
        </div>

        {managers.length > 0 ? (
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
              {managers.map((manager) => (
                <tr key={manager.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{manager.name}</td>
                  <td className="p-3">{manager.role}</td>
                  {/* <td className="p-3">{manager.number}</td> */}
                  <td className="p-3">{manager.email}</td>
                  {/* <td className="p-3">{manager.password}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No managers added yet.</p>
        )}
      </div>

      {showModal && (
        <ManagerForm
          onSave={handleAddManager}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
