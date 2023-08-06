import mongoose from "mongoose";

// set rule
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min_length: 3,
    max_length: 55,
  },
  price: {
    type: Number,
    min: 0,
    max: 10000000,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Customer",
  },
});

export const Product = mongoose.model("Product", productSchema);

// create table
