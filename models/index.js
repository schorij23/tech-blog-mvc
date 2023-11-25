const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');


User.hasMany(Blog, {
    foreignKey: 'user_id'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };