const express = require("express");
const { connectToDB } = require("./config/database");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

connectToDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`server started at PORT:${PORT}`);
});
