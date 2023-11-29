const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create a new blog post (requires authentication - means your loggedIn)
router.post('/', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        // Spread operator to include properties from the request body
        ...req.body,
        // Setting the user_id for the blog entry based on the user session
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // DELETE route to delete a blog post by ID (requires authentication - means your loggedIn)
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          // Deleting the blog with the specified id
          id: req.params.id,
          // Setting that the user_id matches the user's session
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: '404 Blog ID not found' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;