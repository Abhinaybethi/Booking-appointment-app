const express = require("express");
const {
    createBus,
    getAllBuses,
    getBusBookings
} = require("../controllers/busController");

const router = express.Router();

router.post("/", createBus);              // POST /buses
router.get("/", getAllBuses);             // GET /buses
router.get("/:id/bookings", getBusBookings); // GET /buses/:id/bookings

module.exports = router;
