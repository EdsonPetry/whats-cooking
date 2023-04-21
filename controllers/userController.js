const router = require("express").Router();
const User = require("../models/user");

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login')
  };
  
  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  const createdAt = user.createdAt
  // console.log(createdAt.format('DD MM YYYY'))
  
  // const sliceDate = createdAt.slice(15)
    res.render('user_dashboard', {
      user: user,
      username: user.username,
      membersince: createdAt
    });
  });

//removed unecessary route '/dashboard'
module.exports = router;
