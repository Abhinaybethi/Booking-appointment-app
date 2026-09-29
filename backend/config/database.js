const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false // disable SQL query logs in console (set to console.log to enable)
    }
);

module.exports = sequelize;