require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/payment", paymentRoutes);

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize
    .sync()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("Database sync error:", error));
