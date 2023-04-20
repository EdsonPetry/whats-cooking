const User = require("./user");
const Post = require("./post");
const Category = require("./category");
const Comment = require("./comment");

User.hasMany(Post, { foreignKey: "user_id" });
Category.hasMany(Post, { foreignKey: "category_id" });

Post.belongsTo(User, { foreignKey: "user_id" });
Post.belongsTo(Category, { foreignKey: "category_id" });

module.exports = { User, Category, Post };
