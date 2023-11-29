const router = require('express').Router();
const { User, Blog, Comment} = require('../models');
const withAuth = require('../utils/auth');

// GET route for the homepage
router.get('/', async (req, res) => {
	try {
		// Retrieve blog data with associated usernames
		const blogData = await Blog.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});
		// Map blog data to plain JavaScript objects
		const blogs = blogData.map((blog) => blog.get({
			plain: true
		}));
		// Render the homepage view with blog data and logged_in status
		res.render('homepage', {
			blogs,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// GET route for a specific blog post based on id
router.get('/blog/:id', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [
				{
				// Including the User model to retrieve the username attribute
					model: User,
					attributes: ['username'],
				}, {
					// Including the Comment model along with its associated User
					model: Comment,
					include: [
						User
					]
				}
			],
		});
		// Converting the Sequelize model instance to a plain JavaScript object
		const blog = blogData.get({
			plain: true
		});

		console.log(blog)
		// Rendering the 'blog' view with the retrieved data and additional information
		res.render('blog', {
			// Spread operator to include data from the blog object
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// GET route for the user dashboard (requires authentication thay you are loggedin)
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
			console.log(user);
		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
	// GET route for the login page
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
  });

  // GET route for the signup page
  router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});
module.exports = router;