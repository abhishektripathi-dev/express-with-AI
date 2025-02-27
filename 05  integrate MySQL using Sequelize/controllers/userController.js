const { User } = require("../models");

const bcrypt = require("bcryptjs");

// GET all users
const getAllUsers = async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
};

// GET a user by ID
const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

// CREATE a new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
};

// UPDATE a user
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json(user);
};

// DELETE a user
const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
