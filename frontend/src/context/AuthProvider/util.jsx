import React from "react";
import { api } from "../../config/api";
import { Navigate, useNavigate } from "react-router-dom";

export async function LoginRequest(email, password) {
  try {
    const request = await api.post("signin", { email, password });
    return request.data;

  } catch (error) {
    console.log(`Erro no LoginRequest${error}`);
    return null;
  }
}

export async function ChangePasswordRequest(email) {
  try {
    const request = await api.post("change-password", { email });
    return;
  } catch (error) {
    console.log(`Erro no LoginRequest${error}`);
    return null;
  }
}

export async function PasswordReset(password, token) {

  const navigate = useNavigate()
  try {
    const request = await api.post(`redefinir-senha/${token}`, {
      newPassword: password,
    });
    if (request) {
      console.log("Senha alterada com sucesso!");
    }

    navigate("/", { replace: true });

  } catch (error) {
    console.log(error);
  }
}

export async function RegisterRequest(email, password, name) {
  try {
    const request = await api.post("signup", { email, password, name });
    return request.data;
  } catch (error) {
    console.log(`Erro no RegisterRequest${error}`);
    return null;
  }
}

export function setUserLocalStorage(payload) {
  localStorage.setItem("user", JSON.stringify(payload));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}
