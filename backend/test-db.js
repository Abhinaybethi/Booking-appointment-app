const sequelize = require("./config/database");
require("./models/User");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("MySQL connection successful!");

        await sequelize.sync();

        console.log("Database tables synchronized!");
    } catch (error) {
        console.error("Database error:", error.message);
    }
}

testConnection();