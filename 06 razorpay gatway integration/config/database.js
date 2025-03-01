require('dotenv').config({path: require('path').join(__dirname, '..', '.env')});
const sequelize = require('sequelize');

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

module.exports = db;

