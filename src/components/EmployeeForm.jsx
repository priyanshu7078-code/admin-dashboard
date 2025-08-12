import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeForm({ initialData, onClose, onSubmit }) {
 
  const [formData, setFormData] = useState({
     
    name: "",
    email: "",
    phone: "",
    address: "",
    salary: "",
    position: "",
    department: "",
    status: "active",
  });

  // Pre-fill form when editing
useEffect(() => {
  if (initialData) {
    setFormData({
      name: initialData.userInfo?.name || "",
      email: initialData.userInfo?.email || "",
      phone: initialData.userInfo?.phone || "",
      address: initialData.userInfo?.address || "",
      salary: initialData.salary || "",
      position: initialData.position || "",
      department: initialData.department || "",
      status: initialData.status || "active",
    });
  }
}, [initialData]);


  // ✅ FIXED: Handle input changes
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // ✅ Simplified submit logic — calls onSave passed from parent
   const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    console.log("Sending formData:", formData);

 
    // try {
    //   if (initialData) {
    //     // Update API
    //     const res = await axios.put(`http://192.168.1.43:5000/dashboard/employees/${initialData._id}`, formData);
    //     onSubmit(res.data);
    //   } else {
    //     // Create API
    //     const res = await axios.post("http://192.168.1.43:5000/dashboard/employees", formData);
    //     onSubmit(res.data);
        
    //   }

    //   onClose();
    // } catch (err) {
    //   console.error("Failed to save employee:", err);
    //   alert("Something went wrong. Check console.");
    // }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            className="text-red-500 font-semibold hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                minLength={2}
                maxLength={100}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                pattern="[0-9]{10}"
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                minLength={5}
                maxLength={255}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                min={0}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              >
                <option value="">Select position</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              >
                <option value="">Select department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {initialData ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
