require('dotenv').config();
const { Pool } = require('pg');

// Create a new PostgreSQL pool connection
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

module.exports = pool;
