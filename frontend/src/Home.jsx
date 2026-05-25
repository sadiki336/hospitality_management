import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);

  const API = "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, dRes, aRes] = await Promise.all([
          axios.get(`${API}/patient`),
          axios.get(`${API}/doctor`),
          axios.get(`${API}/appointment`),
        ]);

        setPatients(pRes.data.length);
        setDoctors(dRes.data.length);
        setAppointments(aRes.data.length);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">
          Hospital Management System
        </h1>
        <p className="text-gray-600 mt-2">
          Manage Patients, Doctors, and Appointments easily
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-blue-600">Patients</h2>
          <p className="text-3xl font-bold mt-2">{patients}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-green-600">Doctors</h2>
          <p className="text-3xl font-bold mt-2">{doctors}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-purple-600">Appointments</h2>
          <p className="text-3xl font-bold mt-2">{appointments}</p>
        </div>

      </div>

      {/* FEATURES SECTION */}
      <div className="bg-white p-8 rounded-xl shadow max-w-5xl mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
          System Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">

          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-blue-600">👨‍⚕️ Patient Management</h3>
            <p>Add, update, and track patient records easily.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-green-600">🩺 Doctor Management</h3>
            <p>Manage doctors, specialization, and contact details.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-purple-600">📅 Appointments</h3>
            <p>Schedule and track patient appointments with doctors.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-red-600">📊 Reports</h3>
            <p>View full hospital reports and analytics.</p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} HMS System - Built with React & Node.js
      </div>

    </div>
  );
}

export default Home;