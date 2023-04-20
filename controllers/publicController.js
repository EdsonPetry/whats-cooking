const router = require("express").Router();
const Post = require('../models/post')
const axios = require('axios');

router.get("/", async (req, res) => {
  const post = await Post.findAll({raw: true});
  res.render("index", {
    post: post
 });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});


module.exports = router;
