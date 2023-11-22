const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comments extends Model {}


Comments.init (

    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        comment_infromation: {
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
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
            // body: DataTypes.STRING},  
            // {sequelize}
);
module.exports = Comments;



