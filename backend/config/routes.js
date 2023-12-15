import { createUser, deleteUser, getUser, getUsers } from "../api/users/user.js";
import {changePassword, newPassword} from '../api/users/passwordChange.js'
//import {createBill, getBills, deleteBill, editBill} from '../api/bills/bills.js'
import {admin, verifyToken} from '../config/middlewares.js'
import { userLogin } from "../api/users/auth.js";
import {createClient, deleteClient, getClients} from '../api/clients/clients.js'
import { newTransaction } from "../api/transactions/transaction.js";

import express from 'express';
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
router.get("/:userId/clients", getClients )
router.post("/createClient", createClient);
router.delete("/deleteClient", deleteClient)

// TRANSACTIONS ROUTES
router.post("/newTransaction", newTransaction)

export default router
