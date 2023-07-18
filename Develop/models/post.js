const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true, // Add timestamps (createdAt and updatedAt)
        underscored: false // Use snake_case for column names (e.g., created_at)
    });


    return Post;
};