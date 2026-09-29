const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bus = sequelize.define("Bus", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    busNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },

    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    tableName: "buses",
    timestamps: true
});

module.exports = Bus;
