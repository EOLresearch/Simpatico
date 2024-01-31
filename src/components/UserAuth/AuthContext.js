import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const exampleUser = {
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

export const AuthProvider = ({ children }) => {
    const [cognitoUser, setCognitoUser] = useState();

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
