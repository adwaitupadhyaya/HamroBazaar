import express from "express";
import {
  validateCustomer,
  addCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerByID,
  editCustomer,
  searchCustomer,
} from "./customer.service.js";

const router = express.Router();

// create a customer
router.post("/create", validateCustomer, addCustomer);

router.get("/get", getCustomers);

router.get("/details/:id", getCustomerByID);

router.put("/edit/:id", validateCustomer, editCustomer);

router.delete("/delete/:id", deleteCustomer);

// TODO: search by name
router.get("/search", searchCustomer);

export default router;
