CREATE TABLE UserCredentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cognito_user_id VARCHAR(255) UNIQUE NOT NULL,
  isAdmin BOOLEAN,
  email VARCHAR(255) UNIQUE NOT NULL,
  displayName VARCHAR(255),
  photoURL VARCHAR(255)
);
CREATE TABLE UserProfile (
  user_id INT PRIMARY KEY, 
  bioSex VARCHAR(50),
  birthDate DATE,
  cause VARCHAR(255),
  consent BOOLEAN,
  deceasedAge INT,
  education VARCHAR(255),
  ethnicity VARCHAR(255),
  hobbies TEXT,
  household VARCHAR(255),
  kinship VARCHAR(255),
  lossDate DATE,
  lossExp TEXT,
  race VARCHAR(255),
  residence VARCHAR(255),
  simpaticoMatch VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES UserCredentials(id)
);
CREATE TABLE Conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) DEFAULT 'Unnamed Conversation',
  mutualConsent BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Contacts (
  user_id INT,
  contact_user_id INT,
  added_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, contact_user_id),
  FOREIGN KEY (user_id) REFERENCES UserCredentials(id),
  FOREIGN KEY (contact_user_id) REFERENCES UserCredentials(id)
);

CREATE TABLE Messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT,
  sender_id INT,
  message TEXT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id),
  FOREIGN KEY (sender_id) REFERENCES UserCredentials(id)
);
CREATE TABLE User_Conversation (
  user_id INT,
  conversation_id INT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, conversation_id),
  FOREIGN KEY (user_id) REFERENCES UserCredentials(id),
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);

-- -- UserCredentials table stores basic authentication and user identification information.
-- CREATE TABLE UserCredentials (
--   id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user
--   cognito_user_id VARCHAR(255) UNIQUE NOT NULL, -- Cognito ID for integration with AWS Cognito
--   isAdmin BOOLEAN, -- Flag to indicate if the user has admin privileges
--   email VARCHAR(255) UNIQUE NOT NULL, -- User's email address, unique for each user
--   displayName VARCHAR(255), -- User's display name
--   photoURL VARCHAR(255) -- URL to the user's profile photo
-- );

-- -- UserProfile table stores detailed profile information for each user.
-- CREATE TABLE UserProfile (
--   user_id INT PRIMARY KEY, -- Foreign key that references UserCredentials. Establishes a one-to-one relationship.
--   bioSex VARCHAR(50),
--   birthDate DATE,
--   cause VARCHAR(255),
--   consent BOOLEAN,
--   deceasedAge INT,
--   education VARCHAR(255),
--   ethnicity VARCHAR(255),
--   hobbies TEXT,
--   household VARCHAR(255),
--   kinship VARCHAR(255),
--   lossDate DATE,
--   lossExp TEXT,
--   race VARCHAR(255),
--   residence VARCHAR(255),
--   simpaticoMatch VARCHAR(255),
--   FOREIGN KEY (user_id) REFERENCES UserCredentials(id) -- Enforces the one-to-one relationship to UserCredentials
-- );

-- -- Conversations table for storing conversation metadata.
-- CREATE TABLE Conversations (
--   id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each conversation
--   name VARCHAR(255) DEFAULT 'Unnamed Conversation', -- Optional name for the conversation
--   mutualConsent BOOLEAN DEFAULT TRUE, -- Flag to indicate if the conversation requires mutual consent to join
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the conversation was created
-- );

-- -- Contacts table for storing user contacts, representing a many-to-many relationship between users.
-- CREATE TABLE Contacts (
--   user_id INT, -- User who owns the contact
--   contact_user_id INT, -- The contact user
--   added_on DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the contact was added
--   PRIMARY KEY (user_id, contact_user_id), -- Composite primary key to ensure uniqueness
--   FOREIGN KEY (user_id) REFERENCES UserCredentials(id), -- Establishes relationship to UserCredentials
--   FOREIGN KEY (contact_user_id) REFERENCES UserCredentials(id) -- Establishes relationship to UserCredentials (for the contact)
-- );

-- -- Messages table for storing messages in conversations.
-- CREATE TABLE Messages (
--   id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each message
--   conversation_id INT, -- The conversation this message belongs to
--   sender_id INT, -- The user who sent the message
--   message TEXT, -- The message content
--   sent_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the message was sent
--   FOREIGN KEY (conversation_id) REFERENCES Conversations(id), -- Links message to its conversation
--   FOREIGN KEY (sender_id) REFERENCES UserCredentials(id) -- Links message to its sender in UserCredentials
-- );

-- -- User_Conversation table for tracking which users are part of which conversations (many-to-many).
-- CREATE TABLE User_Conversation (
--   user_id INT, -- The user in the conversation
--   conversation_id INT, -- The conversation the user is part of
--   joined_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the user joined the conversation
--   PRIMARY KEY (user_id, conversation_id), -- Composite primary key to ensure uniqueness
--   FOREIGN KEY (user_id) REFERENCES UserCredentials(id), -- Establishes relationship to UserCredentials
--   FOREIGN KEY (conversation_id) REFERENCES Conversations(id) -- Establishes relationship to Conversations
-- );
