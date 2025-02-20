const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerUser, findUserByEmail } = require("../models/userModel");
require('dotenv').config({ path: '../.env' });


// User Registration
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const existingUser = findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const user = await registerUser(name, email, password);
  res.status(201).json({ message: "User registered successfully", user });
};

// User Login
const login = async (req, res) => {

  const { email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });


  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.json({ message: "Login successful", token });
};

module.exports = { register, login };
