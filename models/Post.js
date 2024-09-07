// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define(
	'Post',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		tableName: 'posts', // Ensure Sequelize uses your existing 'posts' table
		timestamps: false, // Disable createdAt and updatedAt timestamps if not using them
	}
);

module.exports = Post;
