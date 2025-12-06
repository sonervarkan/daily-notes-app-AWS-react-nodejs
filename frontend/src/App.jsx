// frontend/src/App.jsx
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Notes from "./components/Notes";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("login");
  const { isLoggedIn } = useAuth();
  

  return (
    <div>
      <nav class="nav">
        {!isLoggedIn && (
          <>
            <h2>Notes App</h2>
            <div class="menu">
              <button onClick={() => setActivePage("login")}>Login</button>
              <button onClick={() => setActivePage("register")}>Register</button>
            </div>
          </>
        )}
      </nav>

      <div>
        {!isLoggedIn && activePage === "login" && <LoginForm />}
        {!isLoggedIn && activePage === "register" && <RegisterForm />}
        {isLoggedIn && <Notes />}
      </div>
    </div>
  );
};

export default App;
