const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Input validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "name, email, and phone are required"
            });
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const user = await User.create({ name, email, phone });

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error(error);

        // Handle duplicate email (Sequelize unique constraint)
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "A user with this email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers
};