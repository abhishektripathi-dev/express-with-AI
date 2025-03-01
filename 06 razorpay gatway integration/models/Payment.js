const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define("Payment", {
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    payement_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
        defaultValue: "PENDING",
    }
});

module.exports = Payment;
