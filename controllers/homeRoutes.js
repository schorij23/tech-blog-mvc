const router = require('express').Router();
const { User, Blog, Comments} = require('../models');
const withAuth = require('../utils/auth');

// Probably blog not user homepage has multiple user names?
// This is my guess..
router.get('/', async (req, res) => {
	try {
		const blogData = await Blog.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});

		const blogs = blogData.map((blog) => blog.get({
			plain: true
		}));

		res.render('homepage', {
			blogs,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/blog/:id', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comments,
					include: [
						User
					]
				}
			],
		});

		const blog = blogData.get({
			plain: true
		});

		res.render('blog', {
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Blog
			}],
		});

		const user = userData.get({
			plain: true
		});

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// router.get('/', withAuth, async (req, res) => {
//     // ?Data from user or blog itself or both???
//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//         // ?ACS-ascending order???
//         order: [['username', 'ASC']],
//       });
  
//       const users = userData.map((project) => project.get({ plain: true }));
  
//       res.render('homepage', {
//         users,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
  });

  // ?Signup if no account??
  router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});
module.exports = router;