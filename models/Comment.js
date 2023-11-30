const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comments class as an extension of the Sequelize Model class
class Comment extends Model {}


Comment.init (

    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        comment_description: {
          type: DataTypes.STRING,
        },
        date_created: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        blog_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'blog',
            key: 'id',
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
      },
      {
        // Sequelize instance
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }

);
module.exports = Comment;



