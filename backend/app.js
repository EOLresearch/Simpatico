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

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user/profile/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM UserProfile WHERE user_id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving user profile');
    }

    if (results.length === 0) {
      return res.status(404).send('User profile not found');
    }

    res.json(results[0]);
  });
});

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



// Example: Get all users
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

