const express = require('express');
const mysql = require('mysql2'); 

const app = express();
const port = 3001;

// MySQL connection configuration
const db = mysql.createPool({
    host: 'your_database_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});
// Test database connection
db.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected to MySQL');
    connection.release();
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

