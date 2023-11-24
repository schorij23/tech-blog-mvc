const sequelize = require('../config/connection');
const { User, Comments, Blog } = require('../models');

const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');
// Function to seed the database with data
const seedDatabase = async () => {
    // Synchronize the Sequelize models with the database and force it to recreate tables
    await sequelize.sync({ force: true });
    // Bulk create users with individual hooks for hashing passwords
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    // Loop through blogData and create blogs with a random user_id
    for (const blog of blogData) {
      await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    // Bulk create comments
    const comments = await Comments.bulkCreate(commentData, {
      returning: true,
    });
  
    process.exit(0);
};

seedDatabase();
