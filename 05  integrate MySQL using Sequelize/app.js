require("dotenv").config();
const express = require("express");
const { connectDB } = require("./models/index");

const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("Welcome to My Express API with MySQL!");
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
});
