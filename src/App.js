import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import UserAuth from './components/UserAuth/UserAuth';
import { firestore, auth } from './firebase-config';
import WelcomeMessage from './components/Dashboard/WelcomeMessage';

function App() {
  const [user] = useAuthState(auth);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [adminDash, setAdminDash] = useState(false);
  const [fsUser, setFsUser] = useState(null);
  const [fsMatch, setFsMatch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setShowWelcomeMessage(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserAndMatch = async () => {
      if (!user) return;

      const usersRef = firestore.collection('users');
      const userQuery = usersRef.where('email', '==', user.email);

      try {
        const userSnapshot = await userQuery.get();
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setFsUser(userData);

          if (userData.simpaticoMatch) {
            const matchDoc = await usersRef.doc(userData.simpaticoMatch).get();
            if (matchDoc.exists) {
              setFsMatch(matchDoc.data());
            } else {
              throw new Error("No such match user document!");
            }
          }
        }
      } catch (error) {
        setError(error);
        console.log('Error getting documents: ', error);
      }
    };

    fetchUserAndMatch();
  }, [user]);

  const navHandler = (renderCondition) => {
    if (renderCondition === 'welcome') {
      setShowWelcomeMessage(!WelcomeMessage);
    };
  }



  const updateFsUser = (updatedUser) => {
    setFsUser(updatedUser);
  };


  return (
    <div className="App">
      <div className='app-container'>
        <Nav 
          user={user} 
          navHandler={navHandler} 
          fsUser={fsUser} 
          adminDash={adminDash}/>

        <div className='app-inner-container'>
          <div className='app-body'>
            {error && <div>Error: {error.message}</div>}
            {
              user ? (user.emailVerified ? (
                <Dashboard
                  user={user}
                  fsUser={fsUser}
                  match={fsMatch}
                  adminDash={adminDash}
                  navHandler={navHandler}
                  updateFsUser={updateFsUser}
                  showWelcomeMessage={showWelcomeMessage}
                />
              ) : (
                <UserAuth user={user} />
              )) : (
                <UserAuth />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
