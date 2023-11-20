const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comments.findAll({});
        res.json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const commentPost = await Comments.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.json(commentPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/id', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message:'404 Blog ID not found'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;