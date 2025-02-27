const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Use Routes
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Welcome to My Express API!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
