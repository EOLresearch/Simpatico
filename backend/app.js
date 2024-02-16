require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Failed to connect to MySQL Server!');
    return; // Don't throw here to avoid crashing the server
  }
  console.log('Connected to MySQL Server!');
});

// Routes
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
    const profileQuery = 'SELECT * FROM UserProfiles WHERE user_id = ?';
    const [profileResults] = await connection.promise().query(profileQuery, [userCredentials.id]);
    const userProfile = profileResults[0] || null; // UserProfile might be null if not found

    // Query for User's Contacts
    const contactsQuery = 'SELECT * FROM Contacts WHERE user_id = ?';
    const [contactsResults] = await connection.promise().query(contactsQuery, [userCredentials.id]);
    const userContacts = contactsResults[0] || null; // UserContacts might be null if not found

    // Query for User's Conversations
    const conversationsQuery = 'SELECT Conversations.* FROM Conversations JOIN User_Conversations ON Conversations.id = User_Conversations.conversation_id WHERE User_Conversations.user_id = ?';
    const [conversationsResults] = await connection.promise().query(conversationsQuery, [userCredentials.id]);
    const userConversations = conversationsResults[0] || null; // UserConversations might be null if not found

    let allConversationsWithParticipants = [];
    for (let conversation of conversationsResults) {
      const participantsQuery = `
        SELECT UserCredentials.* 
        FROM UserCredentials 
        JOIN User_Conversations ON UserCredentials.id = User_Conversations.user_id 
        WHERE User_Conversations.conversation_id = ?`;
      const [participantsResults] = await connection.promise().query(participantsQuery, [conversation.id]);
      
      // Combine conversation info with participant info
      allConversationsWithParticipants.push({
        ...conversation,
        participants: participantsResults
      });
    }
    
    res.json({
      UserCredentials: userCredentials,
      UserProfile: userProfile,
      UserContacts: contactsResults,
      UserConversations: allConversationsWithParticipants
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

