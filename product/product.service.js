import Joi from "joi";
import { Product } from "./product.model.js";

export const validateProduct = async (req, res, next) => {
  const newProduct = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required().trim(),
    price: Joi.number().min(0).max(10000000).required(),
    customerId: Joi.string(),
  });

  try {
    await schema.validateAsync(newProduct);
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const newProduct = req.body;

  if (req.body.customerID) {
    const isValid = checkMongoID(req.body.customerID);
    if (!isValid) {
      return res.status(400).send({ message: "Invalid mongo Id" });
    }
  }
  try {
    await Product.create(newProduct);
    return res.status(201).send({ message: "Product Created" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
