import React, { useState, useEffect, createContext } from 'react';
import {
  getUserLocalStorage,
  setUserLocalStorage,
  LoginRequest,
  RegisterRequest,
} from './util';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email, password) {
    const response = await LoginRequest(email, password);

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);

    return response;
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  async function signup(email, password, name) {
    const response = await RegisterRequest(email, password, name);

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
