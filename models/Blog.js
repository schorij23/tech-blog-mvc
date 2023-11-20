const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    { title: {
        type: DataTypes.STRING
    },
body: {

    type: DataTypes.STRING}
    },
    {sequelize}
    );

module.exports = Blog;