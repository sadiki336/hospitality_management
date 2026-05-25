import React, { useState, useEffect } from "react";
import axios from "axios";

function Add_docter() {

  // =========================
  // STATE FOR LISTING
  // =========================
  const [doctors, setDoctors] = useState([]);

  // =========================
  // FORM STATES
  // =========================
  const [doctorname, setDoctorname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [hireDate, setHireDate] = useState("");

  // =========================
  // CONTROL STATES
  // =========================
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/doctor";

  // =========================
  // FETCH DOCTORS
  // =========================
  const fetchDoctors = async () => {

    try {

      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      setDoctors(response.data);

    } catch (err) {

      console.error(err);
      setError("Failed to fetch doctors.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // =========================
  // CREATE & UPDATE
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const payload = {
        doctorname,
        specialization,
        telephone,
        email,
        hire_date: hireDate,
      };

      if (isEditing) {

        // UPDATE
        const response = await axios.put(
          `${API_URL}/${currentId}`,
          payload,
          { withCredentials: true }
        );

        setMessage(response.data.message);

      } else {

        // CREATE
        const response = await axios.post(
          API_URL,
          payload,
          { withCredentials: true }
        );

        setMessage(response.data.message);
      }

      clearForm();
      fetchDoctors();

    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Network error.");
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete doctor code ${id}?`
    );

    if (!confirmDelete) return;

    try {

      const response = await axios.delete(
        `${API_URL}/${id}`,
        { withCredentials: true }
      );

      setMessage(response.data.message);

      fetchDoctors();

    } catch (err) {

      console.error(err);
      setError("Failed to delete doctor.");
    }
  };

  // =========================
  // EDIT
  // =========================
  const startEdit = (doctor) => {

    setIsEditing(true);

    setCurrentId(doctor.doctor_code);

    setDoctorname(doctor.doctorname);
    setSpecialization(doctor.specialization);
    setTelephone(doctor.telephone);
    setEmail(doctor.email);
    setHireDate(doctor.hire_date);
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {

    setDoctorname("");
    setSpecialization("");
    setTelephone("");
    setEmail("");
    setHireDate("");

    setCurrentId(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isEditing ? "Update Doctor" : "Add Doctor"}
        </h2>

        {/* SUCCESS */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* DOCTOR NAME */}
        <label className="font-semibold">Doctor Name</label>

        <input
          type="text"
          required
          value={doctorname}
          onChange={(e) => setDoctorname(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* SPECIALIZATION */}
        <label className="font-semibold">Specialization</label>

        <input
          type="text"
          required
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* TELEPHONE */}
        <label className="font-semibold">Telephone</label>

        <input
          type="text"
          required
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* EMAIL */}
        <label className="font-semibold">Email</label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* HIRE DATE */}
        <label className="font-semibold">Hire Date</label>

        <input
          type="date"
          required
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 mt-2"
        />

        {/* BUTTONS */}
        <div className="flex gap-2">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update"
              : "Save"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}

        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl overflow-x-auto">

        <h3 className="text-xl font-bold mb-4">
          Doctor Directory
        </h3>

        {doctors.length === 0 ? (

          <p>No doctor data found.</p>

        ) : (

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-3">Doctor Code</th>
                <th className="p-3">Doctor Name</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Telephone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Hire Date</th>
                <th className="p-3">Actions</th>

              </tr>
            </thead>

            <tbody>

              {doctors.map((doctor) => (

                <tr
                  key={doctor.doctor_code}
                  className="border-b"
                >

                  <td className="p-3">{doctor.doctor_code}</td>
                  <td className="p-3">{doctor.doctorname}</td>
                  <td className="p-3">{doctor.specialization}</td>
                  <td className="p-3">{doctor.telephone}</td>
                  <td className="p-3">{doctor.email}</td>
                  <td className="p-3">{doctor.hire_date}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => startEdit(doctor)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(doctor.doctor_code)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

export default Add_docter;