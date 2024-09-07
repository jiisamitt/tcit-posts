# tcit-posts

To run this project, you need to have Node.js installed and an `.env` file with the following credentials:

```plaintext
DB_USER=posts
DB_PASSWORD=lKMcDi5r2c7DkSztazuA0DmkqkvZXlLw
DB_HOST=dpg-crdlk98gph6c73dhth2g-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=posts_0gnh
```

This setup uses a real database, but you can also create a PostgreSQL database on your local machine and update the credentials accordingly.

Once the setup is complete, run the following command to start the server:

```bash
node server.js
```

Then, you can test the application by visiting [http://localhost:3000/](http://localhost:3000/) in your browser.
