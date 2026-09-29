const { Booking, User, Bus } = require("../models/index");

// POST /bookings - Create a new booking
const createBooking = async (req, res) => {
    try {
        const { userId, busId, seatNumber } = req.body;

        if (!userId || !busId || seatNumber === undefined) {
            return res.status(400).json({
                message: "userId, busId, and seatNumber are required"
            });
        }

        // Verify User exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: `User with id ${userId} not found`
            });
        }

        // Verify Bus exists
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            return res.status(404).json({
                message: `Bus with id ${busId} not found`
            });
        }

        // Optional seat check: verify availableSeats
        if (bus.availableSeats > 0) {
            bus.availableSeats -= 1;
            await bus.save();
        }

        const booking = await Booking.create({
            userId,
            busId,
            seatNumber
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message
        });
    }
};

// GET /bookings - Get all bookings with both User and Bus details
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Bus,
                    as: "bus",
                    attributes: ["id", "busNumber", "totalSeats", "availableSeats"]
                }
            ]
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings
};
