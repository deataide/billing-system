import React, { useState, useEffect, createContext } from "react";
import {
  getUserLocalStorage,
  setUserLocalStorage,
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  PasswordReset,
} from "./util";

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

    const payload = { token: response.token, email, _id: response.id };
    console.log(response)
    setUser(payload);
    setUserLocalStorage(payload);

    console.log(payload)

    return response;
  }

  async function changePassword(email) {
    const response = await ChangePasswordRequest(email);

    console.log("Enviado para o email");
    return;
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

  async function newPassword(password, token) {
    const response = await PasswordReset(password, token);

    return response
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        logout,
        signup,
        changePassword,
        newPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
