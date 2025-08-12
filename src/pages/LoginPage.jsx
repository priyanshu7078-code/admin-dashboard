"use client"

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:5000/user/login", { email, password }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        const user = res.data;
localStorage.setItem("user", JSON.stringify(user));
navigate("/");

      })
      .catch((err) => {
        console.error("Login failed", err)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid lg:grid-cols-2">
        {/* Left side - Illustration */}
        <div className="hidden lg:block relative bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 p-8">
          <div className="absolute inset-0">
            <img
              src="src/assets/istockphoto-1281150061-1024x1024.jpg"
              alt="Welcome illustration"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-light text-white/80 tracking-widest mb-8">WELCOME</h1>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-100 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-1">Welcome Back!</h2>
            <p className="text-gray-600 text-center mb-6">Enter your credentials to access your account</p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-200"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-700">
              Don't have an account?{" "}
              <button className="font-semibold text-blue-600 hover:underline" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
