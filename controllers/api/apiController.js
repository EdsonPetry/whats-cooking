//import modules/models
const express = require("express");
const router = express.Router();
const { User, Category, Post } = require("../../models");

//GET categories
router.get("/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

//POST a new category
router.post("/categories", async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

//GET users
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

//POST a new user
router.post("/users", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

//GET posts
router.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

// POST a new post
router.post("/posts", async (req, res) => {
  const newPost = await Post.create(req.body);
  res.json(newPost);
});

module.exports = router;
