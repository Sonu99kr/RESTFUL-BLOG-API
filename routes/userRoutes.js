const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);

module.exports = router;
