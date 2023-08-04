import express from "express";
import { db_connect } from "./db_connect.js";
import customerRoutes from "./customer/customer.route.js";

const app = express();
app.use(express.json());

// connect db
db_connect();

// register routes
app.use("/customer", customerRoutes);

const port = 8000;

app.listen(port, () => {
  console.log("App is listening on port", port);
});
