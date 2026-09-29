const express = require("express");
const {
    createStudent,
    createCourse,
    enrollStudent,
    getAllStudents,
    getAllCourses
} = require("../controllers/studentCourseController");

const router = express.Router();

router.post("/students", createStudent);
router.get("/students", getAllStudents);

router.post("/courses", createCourse);
router.get("/courses", getAllCourses);

router.post("/enroll", enrollStudent);

module.exports = router;
