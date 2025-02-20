require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth")); // New auth routes

app.get("/", (req, res) => {
  res.send("Welcome to My Express API!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
