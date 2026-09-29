const User = require("./User");
const Post = require("./Post");
const Student = require("./Student");
const Course = require("./Course");
const StudentCourse = require("./StudentCourse");
const Bus = require("./Bus");
const Booking = require("./Booking");

// ==========================================
// 1:M Association: User -> Post
// ==========================================
User.hasMany(Post, {
    foreignKey: "userId",
    as: "posts",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "userId",
    as: "author"
});

// ==========================================
// M:N Association: Student <-> Course
// ==========================================
Student.belongsToMany(Course, {
    through: StudentCourse,
    foreignKey: "studentId",
    otherKey: "courseId",
    as: "courses"
});

Course.belongsToMany(Student, {
    through: StudentCourse,
    foreignKey: "courseId",
    otherKey: "studentId",
    as: "students"
});

// ==========================================
// 1:M Association: User -> Booking
// A user can make multiple bookings
// ==========================================
User.hasMany(Booking, {
    foreignKey: "userId",
    as: "bookings",
    onDelete: "CASCADE"
});

Booking.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

// ==========================================
// 1:M Association: Bus -> Booking
// A bus can have multiple bookings
// ==========================================
Bus.hasMany(Booking, {
    foreignKey: "busId",
    as: "bookings",
    onDelete: "CASCADE"
});

Booking.belongsTo(Bus, {
    foreignKey: "busId",
    as: "bus"
});

module.exports = {
    User,
    Post,
    Student,
    Course,
    StudentCourse,
    Bus,
    Booking
};
