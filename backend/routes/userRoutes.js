const express = require("express");

const {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);           // POST   /users
router.get("/", getUsers);             // GET    /users
router.put("/:id", updateUser);        // PUT    /users/:id
router.delete("/:id", deleteUser);     // DELETE /users/:id

module.exports = router;