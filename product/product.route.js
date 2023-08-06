import express from "express";
import Joi from "joi";

import { validateProduct, addProduct } from "./product.service.js";
const router = express.Router();

router.post("/create", validateProduct, addProduct);

export default router;
