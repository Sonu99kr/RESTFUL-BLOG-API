const express = require('express');
const {handleUserRegister, handleUserLogin} = require("../controllers/userControllers")
const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);

module.exports = router;