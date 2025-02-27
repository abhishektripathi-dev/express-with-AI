const sequelize = require("../config/database");
const User = require("./userModel");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected...");
    await sequelize.sync({ alter: true }); // Sync tables
    console.log("Database synced...");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { sequelize, connectDB, User };
