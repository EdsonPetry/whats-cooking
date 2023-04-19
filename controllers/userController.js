const router = require("express").Router();
const User = require("../models/user");

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }

  next();
}

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const user = await User.findByPK(req.session.user_id); //corrected 'findbyPK' to 'findByPK'
  res.render("user_dashboard", {
    email: user.email,
  });
});

//removed unecessary route '/dashboard'
module.exports = router;
