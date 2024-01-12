const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example of another route
app.get('/api/example', (req, res) => {
    res.send('This is an example route.');
});

// Handling 404 (Not Found)
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Set the port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
