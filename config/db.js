// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		port: process.env.DB_PORT,
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false, // Disable in production if using valid certs
			},
		},
	}
);

module.exports = sequelize;
