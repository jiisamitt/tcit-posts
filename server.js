const http = require('http');
const pool = require('./config/db');
const parseBody = require('./helpers/parseBody');

const PORT = process.env.PORT || 3000;

// Create the server
const server = http.createServer((req, res) => {
	// Set the response headers
	res.setHeader('Content-Type', 'application/json');

	// Handle "Create Post" (POST /posts)
	if (req.method === 'POST' && req.url === '/posts') {
		parseBody(req, async (err, body) => {
			if (err) {
				res.writeHead(400);
				return res.end(JSON.stringify({ error: 'Invalid JSON' }));
			}

			const { name, description } = body;
			try {
				const newPost = await pool.query(
					'INSERT INTO posts (name, description) VALUES ($1, $2) RETURNING *',
					[name, description]
				);
				res.writeHead(201);
				res.end(JSON.stringify(newPost.rows[0]));
			} catch (err) {
				console.error(err);
				res.writeHead(500);
				res.end(JSON.stringify({ error: 'Server error' }));
			}
		});
	}

	// Handle "List Posts" (GET /posts)
	else if (req.method === 'GET' && req.url === '/posts') {
		pool.query('SELECT * FROM posts', (err, result) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				return res.end(JSON.stringify({ error: 'Server error' }));
			}
			res.writeHead(200);
			res.end(JSON.stringify(result.rows));
		});
	}

	// Handle "Delete Post" (DELETE /posts/:id)
	else if (req.method === 'DELETE' && req.url.startsWith('/posts/')) {
		const id = req.url.split('/').pop();

		pool.query('DELETE FROM posts WHERE id = $1', [id], (err, result) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				return res.end(JSON.stringify({ error: 'Server error' }));
			}
			res.writeHead(200);
			res.end(JSON.stringify({ message: 'Post deleted' }));
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
