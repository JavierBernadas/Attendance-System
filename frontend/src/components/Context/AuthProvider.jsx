import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext({
//   isLoggedIn: false,
//   userRole: null,
// });

const AuthContext = createContext({
  isLoggedIn: false,
  userRole: null,
  userName: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log( " User Role " , userRole );

  // This is app-specific logic
  // "Let me verify the user is authenticated before rendering the app"
  // ----- this for loading ! ! !
  useEffect(() => {
    // In a real application, fetch authentication data from a server or local storage
    // Check localStorage on load
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
      setIsLoggedIn(true);
      setUserName(user);
    }
    setLoading(false);
  }, []);

  console.log("LOADING " , loading);

  //login ! ! !
  const login = (token, role, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", user);

    setIsLoggedIn(true); // ✅ update state
    setUserRole(role); // ✅ update state
    setUserName(user);
  };

  //logout ! ! !
  const logout = () => {
    console.log("Logging out...");
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{ loading, login, logout, isLoggedIn, userRole, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
// export default AuthProvider
