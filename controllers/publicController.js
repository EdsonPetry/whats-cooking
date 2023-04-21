const router = require("express").Router();
const Post = require('../models/post')
const User = require('../models/user')
const axios = require('axios');

router.get("/", async (req, res) => {
  const post = await Post.findAll({raw: true});
  const user = await User.findByPk(req.session.user_id)
  res.render("index", {
    post: post,
    user: user
 });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});


module.exports = router;
