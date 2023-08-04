import express from "express";
import {
  validateCustomer,
  addCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerByID,
  editCustomer,
} from "./customer.service.js";
import { checkMongoID } from "../utils/utils.js";
import { Customer } from "./customer.model.js";

const router = express.Router();

// create a customer
router.post("/customer/create", validateCustomer, addCustomer);

router.get("/get", getCustomers);

router.get("/details/:id", getCustomerByID);

// TODO:
router.put("/edit/:id", validateCustomer, editCustomer);

router.delete("/delete/:id", deleteCustomer);

// TODO: search by name

export default router;
