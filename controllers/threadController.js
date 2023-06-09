//Import modules/models
const router = require("express").Router();
const Category = require("../models/category");
const Post = require("../models/post");
const User = require("../models/user");

//check if user is logged in
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
}

//render the newpost view
router.get("/newpost", isAuthenticated, async(req, res) => {
  const user = await User.findByPk(req.session.user_id)
  res.render("newpost", {
    user: user
  });
});

// viewing category and its related threads
router.get("/category/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Post, include: [User] }],
  });

  //check if category is null
  if (!category) {
    return res.status(404).send("Category not found");
  }

  const posts = category.Posts.map((post) => post.get({ plain: true }));

  res.render("category", {
    category: category.get({ plain: true }),
    posts,
  });
});

//viewing a specific thread
router.get("/thread/:id", async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const post = await Post.findByPk(req.params.id, {
    include: [User],
  });

  res.render("thread", {
    post: post.get({ plain: true }),
    user: user
  });
});

//creating a new thread
router.post("/newpost", isAuthenticated, async (req, res) => {
  let category = await Category.findOne({
    where: {
      category_name: req.body.category,
    },
  });

  //if the category does not exist, create a new one
  if (!category) {
    category = await Category.create({ category_name: req.body.category });
  }

  const { title, content } = req.body;
  const user_id = req.session.user_id;

  console.log(category.id, title, content, user_id);
  try {
    const newPost = await Post.create({ title, content, user_id, category_id: category.id });
    console.log(newPost)
    console.log("Created new post");
    res.redirect("/"); // Redirect to a relevant page, e.g., the homepage
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating new post");
  }
});
//export
module.exports = router;
