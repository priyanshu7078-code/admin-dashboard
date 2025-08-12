import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedPassword = localStorage.getItem("userPassword");

    if (storedUser) {
      setUser(storedUser);

      setForm({
        fullName: storedUser.fullName || "",
        phone: storedUser.phone || "",
        email: storedUser.email || "",
        password: storedUser.password || storedPassword || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("userPassword", form.password);

    setUser(updatedUser);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 mt-24 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <button
          className="flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">View / Edit Profile</h3>

        {editMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-xl"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="px-4 py-2 border rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 border rounded-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="px-4 py-2 border rounded-xl"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold">Full Name</p>
              <p>{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Phone Number</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Password</p>
              <p>{form.password}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {editMode ? (
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              onClick={handleSave}
            >
              <FaSave /> Save
            </button>
          ) : (
            <button
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
              onClick={() => setEditMode(true)}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
