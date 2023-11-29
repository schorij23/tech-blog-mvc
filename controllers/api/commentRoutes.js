const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// GET route to retrieve all comments
router.get('/',async (req,res) => {
  try {
    const commentData =await Comment.findAll({});
    res.json(commentData);
    }catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
});
// GET route to retrieve a specific comment by ID
router.get('/:id', async (req, res) => {
  try {
    const commentData =await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData);
      }catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});
// POST route to create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      // Spread operator to include data from the request body
      ...req.body,
      // Set the user_id for the new comment based on the authenticated user
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE route to delete a comment by ID (requires authentication - must be loggedin)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        // Deleting the blog with the specified id
        id: req.params.id,
        // Setting that the user_id matches the user's session
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: '404 Blog ID not found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;