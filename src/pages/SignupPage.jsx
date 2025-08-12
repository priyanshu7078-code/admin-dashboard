"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let score = 0; 
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;
    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setStrength(getPasswordStrength(value));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post("http://localhost:5000/user/register", form, {
        withCredentials: true,
      })
      .then((res) => {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
        }
        alert("Signup successful!");
        navigate("/");
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data || "Signup failed. Please try again.";
        console.error("Signup failed:", err);
        setError(errorMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid lg:grid-cols-2">
        {/* Left Illustration */}
        <div className="hidden lg:block relative bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 p-8">
          <div className="absolute inset-0">
            <img
              src="src/assets/istockphoto-1281150061-1024x1024.jpg"
              alt="Signup illustration"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center text-center">
            <h1 className="text-6xl font-light text-white/80 tracking-widest mb-8">
              JOIN US
            </h1>
            <p className="text-white text-lg">
              Create your account and start managing the office dashboard!
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-100 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Sign Up
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your details to create an account
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address / Username"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full pr-10 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password strength */}
              <div className="flex items-center mt-1">
                <div className="h-2 w-24 rounded bg-gray-200 overflow-hidden mr-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength <= 2
                        ? "bg-yellow-300 w-1/3"
                        : strength === 3
                        ? "bg-yellow-400 w-2/3"
                        : "bg-green-400 w-full"
                    }`}
                  ></div>
                </div>
                <span className="text-sm text-gray-700">
                  {strength <= 2 ? "Weak" : strength === 3 ? "Medium" : "Strong"}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
            )}

            <hr className="my-6 border-gray-300" />

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <button
                className="font-semibold text-blue-600 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
