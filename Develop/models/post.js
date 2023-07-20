const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db/config.js');

class Post extends Model {}

Post.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Set the default value to the current timestamp
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
          }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'post',
      });
  
  
      module.exports = Post;