const { Student, Course, StudentCourse } = require("../models/index");

// Create a new student
const createStudent = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Student name is required" });
        }

        const student = await Student.create({ name });
        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Failed to create student", error: error.message });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Course name is required" });
        }

        const course = await Course.create({ name });
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Failed to create course", error: error.message });
    }
};

// Enroll a student in a course (inserts record into student_courses junction table)
const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "studentId and courseId are required" });
        }

        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: `Student with id ${studentId} not found` });
        }

        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: `Course with id ${courseId} not found` });
        }

        // Using Sequelize association mixin method: student.addCourse(course)
        await student.addCourse(course);

        res.status(200).json({
            message: `Successfully enrolled Student (${student.name}) in Course (${course.name})`
        });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Failed to enroll student", error: error.message });
    }
};

// Get all students with their associated courses
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [
                {
                    model: Course,
                    as: "courses",
                    through: { attributes: [] } // omit junction table attributes from response
                }
            ]
        });
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Failed to fetch students", error: error.message });
    }
};

// Get all courses with their enrolled students
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: Student,
                    as: "students",
                    through: { attributes: [] }
                }
            ]
        });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses", error: error.message });
    }
};

module.exports = {
    createStudent,
    createCourse,
    enrollStudent,
    getAllStudents,
    getAllCourses
};
