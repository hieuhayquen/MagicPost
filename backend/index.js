require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const gatherRoutes = require("./routes/gatherRoutes");
const orderRoutes = require("./routes/orderRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const searchRoutes = require("./routes/searchRoutes");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/users/", userRoutes);
app.use("/api/login/", authRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/gathers/", gatherRoutes);
app.use("/api/transactions/", transactionRoutes);
app.use("/api/", searchRoutes);


const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
