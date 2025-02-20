const bcrypt = require("bcryptjs");

let users = [];

// Function to register a new user
const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

// Function to find a user by email
const findUserByEmail = (email) => users.find((user) => user.email === email);

module.exports = { users, registerUser, findUserByEmail };
