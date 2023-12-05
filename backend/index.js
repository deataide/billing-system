import express from "express";
import { createUser, deleteUser, getUser } from "./api/user.js";
import {changePassword, newPassword} from './api/passwordChange.js'
import { userLogin } from "./api/auth.js";
import {admin, verifyToken} from './api/middlewares.js'
import "dotenv/config";
import cors from 'cors'

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});

app.post("/signup", createUser);
app.get("/user/:id", verifyToken, getUser);
app.post("/signin", userLogin);
app.delete("/delete/:id", verifyToken, admin, deleteUser);
app.post("/change-password", changePassword);
app.post("/redefinir-senha/:token", newPassword)
app.get("/verify-token", verifyToken)

app.use((req, res) => {
  res.status(404).json({ mensagem: "Endpoint não encontrado" });
});
