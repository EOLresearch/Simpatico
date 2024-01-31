import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const exampleDBUser = {
  "ethnicity": "Hispanic or Latino",
  "lossExp": "loss exp",
  "email": "joe@joemiller.co",
  "simpaticoMatch": "lxKx8rN4tLcPXh8KO3cYyEOMEMt2",
  "cause": "Natural",
  "photoURL": "https://api.dicebear.com/5.x/thumbs/svg?seed=Casper",
  "bioSex": "Female",
  "education": "Primary school completed",
  "hobbies": "hobbies",
  "kinship": "Spouse",
  "household": "Single parent with children",
  "deceasedAge": "23",
  "birthDate": "1980-01-09",
  "uid": "C0OLyRdPvdWdPcoWUPCAgawogla2",
  "residence": "Illinois",
  "race": "Asian",
  "displayName": "Joe Admin 1",
  "lossDate": "1980-01-01",
  "admin": true,
  "consent": "false"
}
const exampleCognitoUser = {
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

export const AuthProvider = ({ children }) => {
    const [cognitoUser, setCognitoUser] = useState(exampleCognitoUser);

    const signIn = (username, password) => {

      setCognitoUser({ username });
    };

    const signOut = () => {
      setCognitoUser(null);
    };

    return (
        <AuthContext.Provider value={{ cognitoUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
