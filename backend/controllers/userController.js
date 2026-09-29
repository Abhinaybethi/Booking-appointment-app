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

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `User with id ${id} not found`
            });
        }

        // Only update fields that were actually sent
        if (name)  user.name  = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "A user with this email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to update user",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `User with id ${id} not found`
            });
        }

        await user.destroy();

        res.status(200).json({
            message: `User with id ${id} deleted successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};