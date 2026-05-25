import React, { useState, useEffect } from "react";
import axios from "axios";

function Report() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [pRes, dRes, aRes] = await Promise.all([
          axios.get(`${API}/patient`, { withCredentials: true }),
          axios.get(`${API}/doctor`, { withCredentials: true }),
          axios.get(`${API}/appointment`, { withCredentials: true }),
        ]);

        setPatients(pRes.data);
        setDoctors(dRes.data);
        setAppointments(aRes.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load hospital reports from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-blue-600 font-bold text-xl animate-pulse">
          Loading Hospital Reports...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* ================= PATIENT REPORT ================= */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Patients Report
      </h1>

      <div className="overflow-x-auto mb-10">
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {patients.map((p) => (
              <tr key={p.patient_id} className="border-b">
                <td className="p-3">{p.patient_id}</td>
                <td className="p-3">{p.firstname}</td>
                <td className="p-3">{p.lastname}</td>
                <td className="p-3">{p.gender}</td>
                <td className="p-3">{p.telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= DOCTOR REPORT ================= */}
      <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
        Doctors Report
      </h1>

      <div className="overflow-x-auto mb-10">
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {doctors.map((d) => (
              <tr key={d.doctor_code} className="border-b">
                <td className="p-3">{d.doctor_code}</td>
                <td className="p-3">{d.doctorname}</td>
                <td className="p-3">{d.specialization}</td>
                <td className="p-3">{d.telephone}</td>
                <td className="p-3">{d.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= APPOINTMENT REPORT ================= */}
      <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        Appointments Report
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Diagnosis</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((a) => (
              <tr key={a.appointment_id} className="border-b">
                <td className="p-3">{a.appointment_id}</td>
                <td className="p-3">{a.patient_id}</td>
                <td className="p-3">{a.doctor_code}</td>
                <td className="p-3">{a.appointmentdate}</td>
                <td className="p-3">{a.diagnosis}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Report;