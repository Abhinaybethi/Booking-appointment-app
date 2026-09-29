const User = require("./User");
const Post = require("./Post");

// One-to-Many: one User can have many Posts
// Sequelize automatically adds userId as a foreign key to the Post table
User.hasMany(Post, {
    foreignKey: "userId",   // column name in Posts table
    as: "posts",            // alias for eager loading
    onDelete: "CASCADE"     // deleting a user removes their posts too
});

Post.belongsTo(User, {
    foreignKey: "userId",
    as: "author"            // alias for eager loading
});

module.exports = { User, Post };
