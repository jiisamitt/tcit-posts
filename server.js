// server.js
const http = require('http');
const sequelize = require('./config/db');
const Post = require('./models/Post');
const parseBody = require('./helpers/parseBody');
const PORT = process.env.PORT || 3000;

// Sync Sequelize with the database (optional, only for development)
sequelize
	.sync()
	.then(() => {
		console.log('Database synced');
	})
	.catch((err) => {
		console.error('Error syncing database:', err);
	});

// Create the server
const server = http.createServer((req, res) => {
	// Set the response headers
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Handle preflight OPTIONS request
	if (req.method === 'OPTIONS') {
		res.writeHead(204);
		return res.end();
	}

	// Handle "Create Post" (POST /posts)
	if (req.method === 'POST' && req.url === '/posts') {
		parseBody(req, async (err, body) => {
			if (err) {
				res.writeHead(400);
				return res.end(JSON.stringify({ error: 'Invalid JSON' }));
			}

			const { name, description } = body;
			try {
				const newPost = await Post.create({ name, description });
				res.writeHead(201);
				res.end(JSON.stringify(newPost));
			} catch (err) {
				console.error(err);
				res.writeHead(500);
				res.end(JSON.stringify({ error: 'Server error' }));
			}
		});
	}

	// Handle "List Posts" (GET /posts)
	else if (req.method === 'GET' && req.url === '/posts') {
		Post.findAll()
			.then((posts) => {
				res.writeHead(200);
				res.end(JSON.stringify(posts));
			})
			.catch((err) => {
				console.error(err);
				res.writeHead(500);
				res.end(JSON.stringify({ error: 'Server error' }));
			});
	}

	// Handle "Delete Post" (DELETE /posts/:id)
	else if (req.method === 'DELETE' && req.url.startsWith('/posts/')) {
		const id = req.url.split('/').pop();

		Post.destroy({ where: { id } })
			.then(() => {
				res.writeHead(200);
				res.end(JSON.stringify({ message: 'Post deleted' }));
			})
			.catch((err) => {
				console.error(err);
				res.writeHead(500);
				res.end(JSON.stringify({ error: 'Server error' }));
			});
	}

	// Handle 404
	else {
		res.writeHead(404);
		res.end(JSON.stringify({ error: 'Not Found' }));
	}
});

// Start the server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
