const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Simulating storage, e.g., a database
const comments = [];

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self';");
    next();
});

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files (JavaScript, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Reflected XSS endpoint
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Search results for: ${query}`); // No sanitization - vulnerable to XSS
});

// Endpoint to handle comment submission
app.post('/comments', (req, res) => {
    const userComment = req.body.comment;
    if (userComment) {
        comments.push(userComment);
    }
    res.send({ comments });
});

app.get('/get-comments', (req, res) => {
    res.send({ comments });
});

// Extra endpoint to show comments with potential XSS vulnerability
app.get('/show-comments', (req, res) => {
    const commentsHtml = comments.map(comment => `<li>${comment}</li>`).join('');
    res.send(`Comments: <ul>${commentsHtml}</ul>`); // No sanitization - vulnerable to XSS
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
