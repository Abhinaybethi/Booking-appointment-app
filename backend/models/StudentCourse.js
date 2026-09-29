const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StudentCourse = sequelize.define("StudentCourse", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    // StudentId and CourseId will be generated automatically as foreign keys by Sequelize associations
}, {
    tableName: "student_courses",
    timestamps: true
});

module.exports = StudentCourse;
