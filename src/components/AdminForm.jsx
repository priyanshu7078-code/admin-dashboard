import { useState } from "react";

const AdminForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    // name: '',
    // phone: "", 
    role: "", 
    email: "",
    // password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // ✅ this sends correct structure to backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div> */}
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            {/* <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone" // ✅ changed from "number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div> */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            {/* <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div> */}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
