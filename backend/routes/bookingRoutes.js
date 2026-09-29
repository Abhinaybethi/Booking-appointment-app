const express = require("express");
const {
    createBooking,
    getAllBookings
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);  // POST /bookings
router.get("/", getAllBookings);  // GET /bookings

module.exports = router;
