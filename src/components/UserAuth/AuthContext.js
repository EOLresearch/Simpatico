import React, { createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    UserCredentials: null,
    UserProfile: null,
    UserContacts: null,
    UserConversations: null
  });

  
  const signIn = async (email, password) => {
       // Mocking a request to Amazon Cognito
       const mockCognitoResponse = {
        AuthenticationResult: {
          IdToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZXhwIjoxNjE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          // Other tokens and data omitted for brevity
        }
      };
      // const decodedToken = jwtDecode(mockCognitoResponse.AuthenticationResult.IdToken);

    const decodedToken = {
      "sub": "12345678-user-uuid-1234",
      "aud": "app-client-id",
      "email_verified": true,
      "event_id": "event-id-1234",
      "token_use": "id",
      "auth_time": 1611695988,
      "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_example",
      "cognito:username": "cognito-123",
      "exp": 1611699588,
      "iat": 1611695988,
      "email": "fakeuser@example.com"
    }

    //go find userCreds and userProfile in my localDB based on email

    try {
      const response = await axios.get(`http://localhost:3001/user/data/${decodedToken.email}`);
      console.log('User data:', response.data)
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }

  };

  const signOut = () => {
    setUserData(null);
  };

  const createUser = async (userDeets) => {
    console.log('Creating user with:', userDeets);
  }


  return (
    <AuthContext.Provider value={{ userData, signIn, signOut, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
