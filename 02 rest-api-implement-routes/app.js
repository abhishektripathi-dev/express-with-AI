const express = require("express");

const userRoutes = require("./routes/users");

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/users", userRoutes);

// Sample Route
app.get("/", (req, res, next) => {
  res.send("Welcome to My Express API!");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
