import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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

    const signIn = (username, password) => {

        setUser({ username });
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
