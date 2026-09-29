require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
require("./models/index"); // loads all models + associations

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const studentCourseRoutes = require("./routes/studentCourseRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // restrict in production via CORS_ORIGIN env var
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/buses", busRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", studentCourseRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Booking Appointment API is running"
    });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

sequelize
    .sync()
    .then(() => {
        console.log("Database synchronized!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database synchronization failed:", error);
        process.exit(1); // exit cleanly on fatal DB error
    });