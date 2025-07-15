const express = require("express");
const { connectToDB } = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

connectToDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`server started at PORT:${PORT}`);
});
