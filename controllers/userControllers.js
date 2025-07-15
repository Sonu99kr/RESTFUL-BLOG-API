const User = require("../models/userSchema");
const { setUser } = require("../services/userAuth");

async function handleUserRegister(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("Email already registered");

  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Passoword",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.render("login", {
      error: "Invalid Username or Passoword",
    });
  }
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

async function handleUserLogout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
};
