const User = require("./User");
const Post = require("./Post");
const Student = require("./Student");
const Course = require("./Course");
const StudentCourse = require("./StudentCourse");

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
// A Student can enroll in many Courses
Student.belongsToMany(Course, {
    through: StudentCourse,
    foreignKey: "studentId",
    otherKey: "courseId",
    as: "courses"
});

// A Course can have many Students
Course.belongsToMany(Student, {
    through: StudentCourse,
    foreignKey: "courseId",
    otherKey: "studentId",
    as: "students"
});

module.exports = {
    User,
    Post,
    Student,
    Course,
    StudentCourse
};
