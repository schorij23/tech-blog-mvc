const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}


Comments.init (

    {  
        body: DataTypes.STRING},  
        {sequelize}
    );


module.exports = Comments;



