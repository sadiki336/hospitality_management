import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login({ showpage }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/login",
        { username, password }
      );

      console.log("Login Success:", response.data);

      // Store user session info (optional but useful)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to dashboard
      showpage("Dashboard");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          HMS Login
        </h2>

        {/* USERNAME */}
        <label className="block mb-1 text-gray-600">Username</label>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* PASSWORD */}
        <label className="block mb-1 text-gray-600">Password</label>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-bold mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* CREATE ACCOUNT */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}

          <span
            onClick={() => showpage("Create_account")}
            className="text-green-600 cursor-pointer font-bold hover:underline"
          >
            Create account here
          </span>

        </p>

      </form>

    </div>
  );
}

export default Login;