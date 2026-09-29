const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
require("./models/User");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Booking Appointment API is running"
    });
});

const PORT = 3000;

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
    });