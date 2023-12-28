import { createUser, deleteUser, getUser, getUsers } from "../api/users/user.js";
import {changePassword, newPassword} from '../api/users/passwordChange.js'
import {admin, verifyToken} from '../config/middlewares.js'
import { userLogin } from "../api/users/auth.js";
import {createClient, deleteClient, editClient, getClients} from '../api/clients/clients.js'
import { newTransaction } from "../api/transactions/transaction.js";

import express from 'express';
import { sendEmail } from "../api/automations/emails.js";

const router = express.Router();

// CRUD ROUTES
router.post("/signup", createUser);
router.get("/user/:id", verifyToken, getUser);
router.post("/signin", userLogin);
router.delete("/delete/:id", verifyToken, admin, deleteUser);
router.post("/change-password", changePassword);
router.post("/redefinir-senha/:token", newPassword)
router.get("/users", verifyToken, getUsers)

// CLIENT ROUTES
router.get("/:userId/clients", verifyToken, getClients )
router.post("/create-client", verifyToken, createClient);
router.delete("/delete-client/:clientId", verifyToken, deleteClient)
router.put("/edit-client/:clientId", verifyToken, editClient);


// TRANSACTIONS ROUTES
router.post("/new-transaction", newTransaction)

//AUTOMATIC EMAILS ROUTE
router.get('/enviar-emails', sendEmail);

export default router
