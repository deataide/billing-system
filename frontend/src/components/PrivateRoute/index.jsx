import React from "react";
import { Navigate } from "react-router-dom";
import { getUserLocalStorage } from "../../context/AuthProvider/util";

export const PrivateRoute = ({ children }) => {
  const authed = getUserLocalStorage();

  return authed ? children : <Navigate to="/" />;
};
