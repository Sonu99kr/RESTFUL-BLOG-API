const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Welcome to the Blog API Home Route" });
});

router.get("/login", (req, res) => {
  return res.json({ message: "Welcome to the login page" });
});

router.get("/register", (req, res) => {
  return res.json({ message: "Welcome to the register page" });
});

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);

module.exports = router;
