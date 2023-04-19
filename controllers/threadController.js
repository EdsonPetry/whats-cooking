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
router.get("/newpost", isAuthenticated, (req, res) => {
  res.render("newpost");
});

//viewing category and its related threads
router.get("/category/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Post, include: [User] }],
  });

  const posts = category.Posts.map((post) => post.get({ plain: true }));

  res.render("category", {
    category: category.get({ plain: true }),
    posts,
  });
});

//viewing a specific thread
router.get("/thread/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [User],
  });

  res.render("thread", {
    post: post.get({ plain: true }),
  });
});

// TESTING

router.get('/newpost', (req, res) => {

  res.render('newpost');
});
// -----------------------------------


//creating a new thread
router.post("/newpost", isAuthenticated, async (req, res) => {
  const { title, content, category_id } = req.body;
  const user_id = req.session.user_id;

  await Post.create({ title, content, category_id, user_id });

  res.redirect(`/category/${category_id}`);
});

//export
module.exports = router;
