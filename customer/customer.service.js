import Joi from "joi";
import { Customer } from "./customer.model.js";
import { checkMongoID } from "../utils/utils.js";
// validation logic of customer
export const validateCustomer = async (req, res, next) => {
  const newCustomer = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required().trim(),
    dob: Joi.string().required().trim(),
    gender: Joi.string()
      .required()
      .valid("male", "female", "preferNotToSay")
      .trim(),
    email: Joi.string().email().required().trim(),
  });

  try {
    await schema.validateAsync(newCustomer);
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// add customer logic
export const addCustomer = async (req, res) => {
  const newCustomer = req.body;

  //   check if user exists
  const customer = await Customer.findOne({ email: newCustomer.email });

  if (customer) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }
  try {
    await Customer.create(newCustomer);
    return res.status(201).send({ message: "Customer created." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// get all customers
export const getCustomers = async (req, res) => {
  try {
    const allCustomers = await Customer.find();
    console.log(allCustomers);
    return res.status(200).send(allCustomers);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// delete customer
export const deleteCustomer = async (req, res) => {
  const customerToDelete = req.params.id;

  // validate id
  const isValidID = checkMongoID(customerToDelete);

  if (!isValidID) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  try {
    await Customer.deleteOne({
      _id: customerToDelete,
    });
    return res.status(200).send({ message: "Customer Deleted Successfully" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const getCustomerByID = async (req, res) => {
  const customerId = req.params.id;
  const isValid = checkMongoID(customerId);
  if (!isValid) {
    return res.status(400).send({ message: "not a valid mongo id" });
  }
  const customerDetails = await Customer.findOne({
    _id: customerId,
  });

  if (!customerDetails) {
    return res.status(400).send({ message: "No customer with such Id" });
  }

  return res.status(200).send(customerDetails);
};

export const editCustomer = async (req, res) => {
  const customerID = req.params.id;
  const isValid = checkMongoID(customerID);

  if (!isValid) {
    return res.status(400).send("Invalid Id");
  }

  console.log(req.body);

  await Customer.updateOne(
    {
      _id: customerID,
    },
    {
      $set: {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
      },
    }
  );
  res.status(200).send({ message: "Customer Edited" });
};

export const searchCustomer = async (req, res) => {
  console.log(req.body);
  try {
    const searchedCustomers = await Customer.find({
      name: { $regex: `${req.body.name}`, $options: "i" },
    });
    return res.status(200).send(searchedCustomers);
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
};
