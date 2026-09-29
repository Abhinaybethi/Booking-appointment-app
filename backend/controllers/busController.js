const { Bus, Booking, User } = require("../models/index");

// POST /buses - Create a new bus
const createBus = async (req, res) => {
    try {
        const { busNumber, totalSeats, availableSeats } = req.body;

        if (!busNumber || totalSeats === undefined || availableSeats === undefined) {
            return res.status(400).json({
                message: "busNumber, totalSeats, and availableSeats are required"
            });
        }

        const bus = await Bus.create({
            busNumber,
            totalSeats,
            availableSeats
        });

        res.status(201).json({
            message: "Bus created successfully",
            bus
        });
    } catch (error) {
        console.error("Error creating bus:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "A bus with this busNumber already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create bus",
            error: error.message
        });
    }
};

// GET /buses - Get all buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.findAll();
        res.status(200).json(buses);
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({
            message: "Failed to fetch buses",
            error: error.message
        });
    }
};

// GET /buses/:id/bookings - Fetch all bookings for a specific bus with user details
const getBusBookings = async (req, res) => {
    try {
        const { id } = req.params;

        const bus = await Bus.findByPk(id);
        if (!bus) {
            return res.status(404).json({
                message: `Bus with id ${id} not found`
            });
        }

        const bookings = await Booking.findAll({
            where: { busId: id },
            attributes: ["id", "seatNumber"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name", "email"]
                }
            ]
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bus bookings:", error);
        res.status(500).json({
            message: "Failed to fetch bus bookings",
            error: error.message
        });
    }
};

module.exports = {
    createBus,
    getAllBuses,
    getBusBookings
};
