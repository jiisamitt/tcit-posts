// Parse the request body as JSON
function parseBody(req, callback) {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	req.on('end', () => {
		try {
			const parsed = JSON.parse(body);
			callback(null, parsed);
		} catch (err) {
			callback(err);
		}
	});
}

module.exports = parseBody;
