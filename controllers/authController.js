const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const user_data = req.body;

  const user = await User.findOne({
    where: {
      email: user_data.email
    }
  });

  if (!user) return res.redirect('/signup');

  const valid_pass = await user.validatePass(user_data.password);

  if (!valid_pass) return res.redirect('/login');

  req.session.user_id = user.id;

  res.redirect('/user_dashboard');
});

module.exports = router;