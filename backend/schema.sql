CREATE TABLE UserCredentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cognito_user_id VARCHAR(255) UNIQUE NOT NULL,
  isAdmin BOOLEAN,
  email VARCHAR(255) UNIQUE NOT NULL,
  displayName VARCHAR(255),
  photoURL VARCHAR(255)
);
CREATE TABLE UserProfiles (
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
  welcome_message TEXT,
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
CREATE TABLE User_Conversations (
  user_id INT,
  conversation_id INT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, conversation_id),
  FOREIGN KEY (user_id) REFERENCES UserCredentials(id),
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);