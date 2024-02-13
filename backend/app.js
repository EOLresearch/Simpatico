const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'password',
  database: 'simpatico_app'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get user data by email - this is the initial request from the frontend
app.get('/user/data/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Query for UserCredentials
    const credentialsQuery = 'SELECT * FROM UserCredentials WHERE email = ?';
    const [credentialsResults] = await connection.promise().query(credentialsQuery, [email]);
    
    if (credentialsResults.length === 0) {
      return res.status(404).send('User not found');
    }

    const userCredentials = credentialsResults[0];

    // Query for UserProfile
    const profileQuery = 'SELECT * FROM UserProfile WHERE user_id = ?';
    const [profileResults] = await connection.promise().query(profileQuery, [userCredentials.id]);
    
    const userProfile = profileResults[0] || null; // userProfile might be null if not found

    // Respond with separately structured data
    res.json({
      UserCredentials: userCredentials,
      UserProfile: userProfile
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user data');
  }
});

// Get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM UserCredentials', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

