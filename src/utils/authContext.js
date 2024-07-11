"use client";

import { fetchUserData } from '@/services/fetchEmailService';
// authContext.js
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  // const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(null);

  const loginCxt = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

// to fetch email from localstorahge token
  useEffect(() => {
    const fetchTokenData = async () => {
      if (token) {
        try {
          const tokenData = await fetchUserData(token);
          setEmail(tokenData.email);
        } catch (error) {
          console.error("Error fetching user data:", error);
          logout(); // Optionally, log out the user on error
        }
      }
      else{
        console.log("go to home");
      }
    };

    // Ensure this effect runs only on the client side
    if (typeof window !== 'undefined') {
      fetchTokenData();
    }
  }, [token]);





  return (
    <AuthContext.Provider value={{ token,email, loginCxt, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

