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
  const post = await Post.findByPk(req.params.id, {
    include: [User],
  });

  res.render("thread", {
    post: post.get({ plain: true }),
  });
});

//creating a new thread
router.post("/newpost", isAuthenticated, async (req, res) => {
  const category = await Category.findOne({
    where: {
      category_name: req.body.category,
    },

  }
  ).then((category) => {
    return category.id;
  });

  const { title, content } = req.body;
  const user_id = req.session.user_id;


  console.log(category, title, content, user_id);
  try {
    await Post.create({ title, content, user_id, category }
    )

    console.log(" created new post")
  }
  catch (err) {
    console.log(err)
  }
});

//export
module.exports = router;
