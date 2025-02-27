const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// User Registration
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully", user });
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.json({ message: "Login successful", token });
};

// User Logout
const logout = (req, res) => {
  // Invalidate the token by setting it to an empty string or null on the client side
  res.json({ message: "Logout successful" });
};

module.exports = { register, login, logout };

// Invalidate the token on the client side: 
// The server-side logout function simply sends a response indicating that the logout was successful.
// To fully invalidate the token, you need to handle this on the client side by removing the token from storage (e.g., localStorage, sessionStorage, or cookies).
// Here is an example of how you might handle this in a client-side JavaScript application: