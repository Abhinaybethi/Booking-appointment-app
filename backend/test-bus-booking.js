require("dotenv").config();
const sequelize = require("./config/database");
const { User, Bus, Booking } = require("./models/index");

async function testBusBookingAssociations() {
    try {
        console.log("Connecting and syncing database tables (Users, Buses, Bookings)...");
        await sequelize.sync({ alter: true });
        console.log("Database tables synchronized successfully!\n");

        // 1. Create or find sample User (POST /users test)
        console.log("--- 1. Creating Sample User ---");
        const [user] = await User.findOrCreate({
            where: { email: "john@example.com" },
            defaults: { name: "John Doe", email: "john@example.com" }
        });
        console.log(`User Ready: ID = ${user.id}, Name = ${user.name}, Email = ${user.email}\n`);

        // 2. Create or find sample Bus (POST /buses test)
        console.log("--- 2. Creating Sample Bus ---");
        const [bus] = await Bus.findOrCreate({
            where: { busNumber: "MH12AB1234" },
            defaults: {
                busNumber: "MH12AB1234",
                totalSeats: 40,
                availableSeats: 30
            }
        });
        console.log(`Bus Ready: ID = ${bus.id}, BusNumber = ${bus.busNumber}, Total = ${bus.totalSeats}, Available = ${bus.availableSeats}\n`);

        // 3. Create sample Booking (POST /bookings test)
        console.log("--- 3. Creating Sample Booking ---");
        const booking = await Booking.create({
            userId: user.id,
            busId: bus.id,
            seatNumber: 10
        });
        console.log(`Booking Created: ID = ${booking.id}, SeatNumber = ${booking.seatNumber}, UserID = ${booking.userId}, BusID = ${booking.busId}\n`);

        // 4. Query Bookings for User with Bus details (GET /users/:id/bookings test)
        console.log("--- 4. Testing GET /users/:id/bookings ---");
        const userBookings = await Booking.findAll({
            where: { userId: user.id },
            attributes: ["id", "seatNumber"],
            include: [
                {
                    model: Bus,
                    as: "bus",
                    attributes: ["busNumber"]
                }
            ]
        });
        console.log("Response for GET /users/:id/bookings:");
        console.log(JSON.stringify(userBookings, null, 2));

        // 5. Query Bookings for Bus with User details (GET /buses/:id/bookings test)
        console.log("\n--- 5. Testing GET /buses/:id/bookings ---");
        const busBookings = await Booking.findAll({
            where: { busId: bus.id },
            attributes: ["id", "seatNumber"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name", "email"]
                }
            ]
        });
        console.log("Response for GET /buses/:id/bookings:");
        console.log(JSON.stringify(busBookings, null, 2));

        console.log("\n✅ All Bus-Booking associations and queries verified successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error testing Bus-Booking associations:", error);
        process.exit(1);
    }
}

testBusBookingAssociations();
