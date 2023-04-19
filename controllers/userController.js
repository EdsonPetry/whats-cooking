const router = require('express').Router();
const User = require('../models/user')

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login')
  };
  
  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findbyPK(req.session.user_id)
    res.render('user_dashboard', {
      email: user.email
    });
  });

module.exports = router;