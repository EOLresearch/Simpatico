import React, { createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userCreds, setUserCreds] = useState();
  const [userProfile, setUserProfile] = useState();

  const signIn = (email, password) => {

    // Simulated response from Amazon Cognito upon successful authentication
    // const mockResponse = {
    //   "AuthenticationResult": {
    //     "AccessToken": "eyJz9sdfsdfsdfsd...sdfwefwef",
    //     "ExpiresIn": 3600,
    //     "TokenType": "Bearer",
    //     "RefreshToken": "eyJjdHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...sdfwefwef",
    //     "IdToken": "eyJraWQiOiJLTzRVMWZs...sdfsdfsdfsdf"
    //   },
    //   "ChallengeParameters": {}
    // };
    // const idToken = mockResponse.AuthenticationResult.IdToken;

    // const decodedToken = jwtDecode(idToken);

    const decodedToken = {
      "sub": "12345678-user-uuid-1234",
      "aud": "app-client-id",
      "email_verified": true,
      "event_id": "event-id-1234",
      "token_use": "id",
      "auth_time": 1611695988,
      "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_example",
      "cognito:username": "janedoe",
      "exp": 1611699588,
      "iat": 1611695988,
      "email": "janedoe@example.com"
    }

    const userCredentials = {
      cognito_user_id: decodedToken['cognito:username'],
      email: decodedToken['email'],
      isAdmin: false,
      displayName: "",
      photoURL: "",
    };

    //use the email to fetch the user profile
    // setUserProfile({});

    setUserCreds(userCredentials);
  };

  const signOut = () => {
    setUserCreds(null);
  };

  return (
    <AuthContext.Provider value={{ userCreds, userProfile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
