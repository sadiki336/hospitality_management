import React, { useState } from "react";
import axios from "axios";

function Create_account({ showpage }) {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/register",
        form
      );

      alert(res.data.message);

      // Redirect to login after success
      showpage("Login_form");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          HMS Create Account
        </h2>

        {/* USERNAME */}
        <label className="block mb-1 text-gray-600">Username</label>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* PASSWORD */}
        <label className="block mb-1 text-gray-600">Password</label>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-bold"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => showpage("Login_form")}
            className="text-blue-600 cursor-pointer font-bold hover:underline"
          >
            Login here
          </span>
        </p>

      </form>

    </div>
  );
}

export default Create_account;