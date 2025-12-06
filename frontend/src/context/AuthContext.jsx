// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { setToken } from "../api/notesApi";

const AuthContext = createContext(); 
// createContext=> Creates an authentication (auth) store and stores user, 
// login(), logout(), isAuthenticated information

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setAuthToken] = useState(null);

   const login = (userData, jwtToken) => {
    setUser(userData);
    setIsLoggedIn(true);
    setAuthToken(jwtToken); // To display user information
    setToken(jwtToken); // To send tokens in API requests (listNote, addNote)
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setAuthToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
