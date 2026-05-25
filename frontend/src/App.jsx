import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Create_account from "./Create_account";

function App() {
  // 'Login_form' niyo paji itangira
  const [currentPage, setCurrentPage] = useState("Login_form");

  const changePage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div>
      {currentPage === "Login_form" && <Login showpage={changePage} />}
      {currentPage === "Create_account" && <Create_account showpage={changePage} />}
      {currentPage === "Dashboard" && <Dashboard showpage={changePage} />}
    </div>
  );
}

export default App;