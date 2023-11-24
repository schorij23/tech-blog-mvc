const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');
// Function to seed the database with sample data
const seedDatabase = async () => {
  // Synchronize the database and force recreation if it already exists
  await sequelize.sync({ force: true });
    // Bulk create users with individual hooks (e.g., hashing passwords) and returning the created instances
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
   // Bulk create comments and return the created instances
  const comments = await Comments.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();