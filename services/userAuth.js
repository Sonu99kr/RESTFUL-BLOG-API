const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userSchema");

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined in the .env file");
}

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: "4d" }
  );
}

async function getUser(token) {
  if (!token) return null;
  try {
    const decode = jwt.verify(token, secret);
    const user = await User.findById(decode._id);
    return user;
  } catch (error) {
    console.error("JWT Verification Error!");
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
