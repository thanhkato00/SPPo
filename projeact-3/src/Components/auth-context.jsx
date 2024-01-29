// auth-context.js
import React, { createContext, useContext, useEffect, useState } from "react";
export const ProductContext = createContext();
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    console.log(user); // Log giá trị user sau mỗi lần re-render
  }, [user]);
  const login = (userData) => {
    // Logic to handle user login, set user in state, etc.
    setUser(userData);
    console.log(user);
  };
  console.log(user);
  const logout = () => {
    // Logic to handle user logout, clear user from state, etc.
    setUser(null);
    console.log(user);
  };
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
