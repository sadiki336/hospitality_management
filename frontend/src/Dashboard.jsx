import React, { useState } from "react";

import Add_docter from "./Add_docter";
import Add_patient from "./Add_patient";
import Add_appointment from "./Add_appointment";

import Home from "./Home";
import Report from "./Report";

function Dashboard({ showpage }) {

  const [page, setPage] = useState("Home");

  // =========================
  // MENU ITEMS
  // =========================
  const menu = [
    { name: "Home", label: "Home" },
    { name: "Doctor", label: "Add Doctor" },
    { name: "Patient", label: "Add Patient" },
    { name: "Appointment", label: "Add Appointment" },
    { name: "Report", label: "Report" },
  ];

  // =========================
  // RENDER PAGES
  // =========================
  const renderPage = () => {

    switch (page) {

      case "Home":
        return <Home />;

      case "Doctor":
        return <Add_docter />;

      case "Patient":
        return <Add_patient />;

      case "Appointment":
        return <Add_appointment />;

      case "Report":
        return <Report />;

      default:
        return <Home />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ fontFamily: "sans-serif" }}
    >

      {/* NAVBAR */}
      <div
        className="flex gap-3 bg-blue-600 text-white p-4 justify-center flex-wrap items-center"
        style={{
          display: "flex",
          gap: "12px",
          background: "#2563eb",
          padding: "16px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >

        {/* MENU BUTTONS */}
        {menu.map((item) => (

          <button
            key={item.name}
            onClick={() => setPage(item.name)}
            className={`px-4 py-2 rounded transition ${
              page === item.name
                ? "bg-yellow-400 text-black font-bold"
                : "bg-white text-blue-600 hover:bg-gray-200"
            }`}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor:
                page === item.name
                  ? "#facc15"
                  : "#ffffff",
              color:
                page === item.name
                  ? "#000000"
                  : "#2563eb",
            }}
          >
            {item.label}
          </button>

        ))}

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => showpage("Login_form")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

      </div>

      {/* PAGE CONTENT */}
      <div
        className="p-6"
        style={{
          padding: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >

          {renderPage()}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;