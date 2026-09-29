require("dotenv").config();
const sequelize = require("./config/database");
const { Student, Course, StudentCourse } = require("./models/index");

async function runManyToManyDemo() {
    try {
        console.log("Connecting to database and syncing models...");
        // alter: true adjusts the tables if they already exist without dropping them
        await sequelize.sync({ alter: true });
        console.log("Database & tables successfully synchronized!\n");

        // 1. Create sample students
        console.log("--- Creating Students ---");
        const student1 = await Student.create({ name: "Rahul Sharma" });
        const student2 = await Student.create({ name: "Priya Patel" });
        console.log(`Created Students: [${student1.id}] ${student1.name}, [${student2.id}] ${student2.name}\n`);

        // 2. Create sample courses
        console.log("--- Creating Courses ---");
        const course1 = await Course.create({ name: "Node.js & Express" });
        const course2 = await Course.create({ name: "React Frontend" });
        const course3 = await Course.create({ name: "SQL & Sequelize" });
        console.log(`Created Courses: [${course1.id}] ${course1.name}, [${course2.id}] ${course2.name}, [${course3.id}] ${course3.name}\n`);

        // 3. Add entries into the Junction Table (student_courses)
        console.log("--- Adding Values to Junction Table (Enrollments) ---");
        // Rahul enrolls in Node.js and SQL
        await student1.addCourses([course1, course3]);
        // Priya enrolls in React and Node.js
        await student2.addCourses([course1, course2]);
        console.log("Enrollment records successfully inserted into junction table (student_courses)!\n");

        // 4. Query Student with their Courses (Eager Loading)
        console.log("--- Querying Students with Associated Courses ---");
        const students = await Student.findAll({
            include: [{
                model: Course,
                as: "courses",
                through: { attributes: [] }
            }]
        });

        students.forEach(s => {
            const courseNames = s.courses.map(c => c.name).join(", ");
            console.log(`Student "${s.name}" is enrolled in: [${courseNames}]`);
        });

        console.log("\n--- Querying Courses with Enrolled Students ---");
        const courses = await Course.findAll({
            include: [{
                model: Student,
                as: "students",
                through: { attributes: [] }
            }]
        });

        courses.forEach(c => {
            const studentNames = c.students.map(s => s.name).join(", ");
            console.log(`Course "${c.name}" has students: [${studentNames}]`);
        });

        console.log("\n✅ Many-to-Many association demo completed successfully!");
        console.log("Open MySQL Workbench to inspect tables: `students`, `courses`, and `student_courses`.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error running Many-to-Many demo:", error);
        process.exit(1);
    }
}

runManyToManyDemo();
