const express = require("express");
const { createPost, getAllPosts, getPostsByUser } = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);                       // Create a post
router.get("/", getAllPosts);                        // Get all posts (with author)
router.get("/user/:userId", getPostsByUser);         // Get all posts by a user

module.exports = router;
