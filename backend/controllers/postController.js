const { User, Post } = require("../models/index");

// POST /posts  → Create a post for a user
const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        // Input validation
        if (!title || !content || !userId) {
            return res.status(400).json({
                message: "title, content, and userId are required"
            });
        }

        // Make sure the user actually exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: `User with id ${userId} not found`
            });
        }

        const post = await Post.create({ title, content, userId });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};

// GET /posts  → Get all posts with their author info
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "author",                  // matches the alias in associations
                    attributes: ["id", "name", "email"] // only expose safe fields
                }
            ]
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};

// GET /posts/user/:userId  → Get all posts by a specific user
const getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Post,
                    as: "posts"   // matches the alias in associations
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: `User with id ${userId} not found`
            });
        }

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            posts: user.posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch posts for this user",
            error: error.message
        });
    }
};

module.exports = { createPost, getAllPosts, getPostsByUser };
