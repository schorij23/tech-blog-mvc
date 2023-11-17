const sequelize = require('../config/connection');
const { User, Comments, Blog } = require('../models');

const userData = require('./userData.json');
const commentsData = require('./Comments.json');
const blogData = require('./blogData');

// ? Still missing comments and blog Data??
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

 

    process.exit(0);
};

seedDatabase();
