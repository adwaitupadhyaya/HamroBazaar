import express from "express";
import { validateCustomer, addCustomer } from "./customer.service.js";
const router = express.Router();

// create a customer
router.post("/customer/create", validateCustomer, addCustomer);

export default router;
