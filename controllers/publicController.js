const router = require("express").Router();
const { Post, Category, User } = require("../models");
const axios = require("axios");
// const User = require("../models/user")

router.get("/", async (req, res) => {
  const randomRecipeURL =
    "https://api.spoonacular.com/recipes/random?apiKey=c824fbe498924d6386b2ba601d0a8cc4";
  // axios fetch here
  let firstRecipes = [];
  const response1 = await axios.get(randomRecipeURL);
  let recipe1 = response1.data.recipes[0].image;
  // console.log(recipe1);
  firstRecipes.push(recipe1);
  const response2 = await axios.get(randomRecipeURL);
  let recipe2 = response2.data.recipes[0].image;
  // console.log(recipe2);
  firstRecipes.push(recipe2);
  const response3 = await axios.get(randomRecipeURL);
  let recipe3 = response3.data.recipes[0].image;
  // console.log(recipe3);
  firstRecipes.push(recipe3);
  const response4 = await axios.get(randomRecipeURL);
  let recipe4 = response4.data.recipes[0].image;
  // console.log(recipe4);
  firstRecipes.push(recipe4);

  // console.log(firstRecipes);
  const posts = await Post.findAll({ include: [Category, User] });
  const post = posts.map((post) => post.get({ plain: true }));
  // console.log(post);
  const user = await User.findByPk(req.session.user_id)
  res.render("index", {
    post: post,
    recipes: firstRecipes,
    user: user
  });

});

// category routes
// RECIPE
router.get("/recipes", async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const recipeposts = await Post.findAll({ include: [Category, User],
  where: {
    category_id: 1
  } });
  const recipepost = recipeposts.map((recipepost) => recipepost.get({ plain: true }));
  res.render("recipes", {
    recipepost: recipepost,
    
    user: user
  });
});
// TIPS
router.get("/tips", async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const tipsposts = await Post.findAll({ include: [Category, User],
  where: {
    category_id: 3
  } });
  const tipspost = tipsposts.map((tipspost) => tipspost.get({ plain: true }));
  res.render("tips", {
    tipspost: tipspost,
    
    user: user
  });
});
// QUESTIONS
router.get("/questions", async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const questionsposts = await Post.findAll({ include: [Category, User],
  where: {
    category_id: 2
  } });
  const questionspost = questionsposts.map((questionspost) => questionspost.get({ plain: true }));
  res.render("questions", {
    questionspost: questionspost,
    
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
