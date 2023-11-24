const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const commentsRoutes = require('./commentsRoutes');
const userRoutes = require('./userRoutes');

router.use('/blogs', blogRoutes);
router.use('/comments', commentsRoutes);
router.use('/users', userRoutes);

module.exports = router;