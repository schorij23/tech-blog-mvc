const router = require('express').Router();
const { User, Blog, Comments} = require('../models');
const withAuth = require('../utils/auth');

// Probably not right yet user or blog or one includes another
router.get('/', withAuth, async (req, res) => {
    // ?Data from user or blog itself or both???
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        // ?ACS-ascending order???
        order: [['username', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
  });

  // ?Signup if no account??

module.exports = router;