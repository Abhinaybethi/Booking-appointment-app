const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
    // userId and busId foreign keys are added automatically via Sequelize associations in models/index.js
}, {
    tableName: "bookings",
    timestamps: true
});

module.exports = Booking;
