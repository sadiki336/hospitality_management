import React, { useState, useEffect } from "react";
import axios from "axios";

function Add_appointment() {

  // =========================
  // STATE FOR LISTING
  // =========================
  const [appointments, setAppointments] = useState([]);

  // =========================
  // FORM STATES
  // =========================
  const [patientId, setPatientId] = useState("");
  const [doctorCode, setDoctorCode] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // CONTROL STATES
  // =========================
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/appointment";

  // =========================
  // FETCH APPOINTMENTS
  // =========================
  const fetchAppointments = async () => {

    try {

      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      setAppointments(response.data);

    } catch (err) {

      console.error(err);
      setError("Failed to fetch appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
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
        patient_id: patientId,
        doctor_code: doctorCode,
        appointmentdate: appointmentDate,
        diagnosis,
        treatment,
        status,
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
      fetchAppointments();

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
      `Are you sure you want to delete appointment ID ${id}?`
    );

    if (!confirmDelete) return;

    try {

      const response = await axios.delete(
        `${API_URL}/${id}`,
        { withCredentials: true }
      );

      setMessage(response.data.message);

      fetchAppointments();

    } catch (err) {

      console.error(err);
      setError("Failed to delete appointment.");
    }
  };

  // =========================
  // EDIT
  // =========================
  const startEdit = (appointment) => {

    setIsEditing(true);

    setCurrentId(appointment.appointment_id);

    setPatientId(appointment.patient_id);
    setDoctorCode(appointment.doctor_code);
    setAppointmentDate(appointment.appointmentdate);
    setDiagnosis(appointment.diagnosis);
    setTreatment(appointment.treatment);
    setStatus(appointment.status);
  };

  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {

    setPatientId("");
    setDoctorCode("");
    setAppointmentDate("");
    setDiagnosis("");
    setTreatment("");
    setStatus("");

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
          {isEditing ? "Update Appointment" : "Add Appointment"}
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

        {/* PATIENT ID */}
        <label className="font-semibold">Patient ID</label>

        <input
          type="number"
          required
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* DOCTOR CODE */}
        <label className="font-semibold">Doctor Code</label>

        <input
          type="number"
          required
          value={doctorCode}
          onChange={(e) => setDoctorCode(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* APPOINTMENT DATE */}
        <label className="font-semibold">Appointment Date</label>

        <input
          type="date"
          required
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* DIAGNOSIS */}
        <label className="font-semibold">Diagnosis</label>

        <input
          type="text"
          required
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* TREATMENT */}
        <label className="font-semibold">Treatment</label>

        <input
          type="text"
          required
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 mt-2"
        />

        {/* STATUS */}
        <label className="font-semibold">Status</label>

        <select
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 mt-2"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

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
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-7xl overflow-x-auto">

        <h3 className="text-xl font-bold mb-4">
          Appointment Records
        </h3>

        {appointments.length === 0 ? (

          <p>No appointment data found.</p>

        ) : (

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-3">Appointment ID</th>
                <th className="p-3">Patient ID</th>
                <th className="p-3">Doctor Code</th>
                <th className="p-3">Appointment Date</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Treatment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>

              </tr>
            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr
                  key={appointment.appointment_id}
                  className="border-b"
                >

                  <td className="p-3">{appointment.appointment_id}</td>
                  <td className="p-3">{appointment.patient_id}</td>
                  <td className="p-3">{appointment.doctor_code}</td>
                  <td className="p-3">{appointment.appointmentdate}</td>
                  <td className="p-3">{appointment.diagnosis}</td>
                  <td className="p-3">{appointment.treatment}</td>
                  <td className="p-3">{appointment.status}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => startEdit(appointment)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(appointment.appointment_id)}
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

export default Add_appointment;