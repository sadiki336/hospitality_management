import React, { useState, useEffect } from "react";
import axios from "axios";

function Add_patient() {

  // =========================
  // STATE FOR LISTING
  // =========================
  const [patients, setPatients] = useState([]);

  // =========================
  // FORM STATES
  // =========================
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  // =========================
  // CONTROL STATES
  // =========================
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/patient";

  // =========================
  // FETCH PATIENTS
  // =========================
  const fetchPatients = async () => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      setPatients(response.data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch patients.");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // =========================
  // CREATE & UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const payload = {
        firstname,
        lastname,
        gender,
        telephone,
        address,
        registration_date: registrationDate,
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
      fetchPatients();

    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Network error.");
      }
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete patient ID ${id}?`
    );

    if (!confirmDelete) return;

    try {

      const response = await axios.delete(
        `${API_URL}/${id}`,
        { withCredentials: true }
      );

      setMessage(response.data.message);

      fetchPatients();

    } catch (err) {
      console.error(err);
      setError("Failed to delete patient.");
    }
  };

  // =========================
  // EDIT
  // =========================
  const startEdit = (patient) => {

    setIsEditing(true);

    setCurrentId(patient.patient_id);

    setFirstname(patient.firstname);
    setLastname(patient.lastname);
    setGender(patient.gender);
    setTelephone(patient.telephone);
    setAddress(patient.address);
    setRegistrationDate(patient.registration_date);
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {

    setFirstname("");
    setLastname("");
    setGender("");
    setTelephone("");
    setAddress("");
    setRegistrationDate("");

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
          {isEditing ? "Update Patient" : "Add Patient"}
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

        {/* FIRSTNAME */}
        <label className="font-semibold">First Name</label>

        <input
          type="text"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* LASTNAME */}
        <label className="font-semibold">Last Name</label>

        <input
          type="text"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* GENDER */}
        <label className="font-semibold">Gender</label>

        <select
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* TELEPHONE */}
        <label className="font-semibold">Telephone</label>

        <input
          type="text"
          required
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* ADDRESS */}
        <label className="font-semibold">Address</label>

        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* REGISTRATION DATE */}
        <label className="font-semibold">Registration Date</label>

        <input
          type="date"
          required
          value={registrationDate}
          onChange={(e) => setRegistrationDate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 mt-2"
        />

        {/* BUTTONS */}
        <div className="flex gap-2">

          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Save"}
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
          Registered Patients
        </h3>

        {patients.length === 0 ? (

          <p>No patient data found.</p>

        ) : (

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-3">ID</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Telephone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Registration Date</th>
                <th className="p-3">Actions</th>

              </tr>
            </thead>

            <tbody>

              {patients.map((patient) => (

                <tr
                  key={patient.patient_id}
                  className="border-b"
                >

                  <td className="p-3">{patient.patient_id}</td>
                  <td className="p-3">{patient.firstname}</td>
                  <td className="p-3">{patient.lastname}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.telephone}</td>
                  <td className="p-3">{patient.address}</td>
                  <td className="p-3">{patient.registration_date}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => startEdit(patient)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(patient.patient_id)}
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

export default Add_patient;