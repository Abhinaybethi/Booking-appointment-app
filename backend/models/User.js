const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,        // Sequelize built-in email validator
            notEmpty: true
        }
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [7, 20]           // at least 7 digits, max 20 chars
        }
    }
});

module.exports = User;