import React from "react";

function Logout({ showpage }) {

  const logout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    showpage("Login_form");
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;