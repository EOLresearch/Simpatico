import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import UserAuth from './components/UserAuth/UserAuth';
import { firestore, auth } from './firebase-config';

function App() {
  const [user] = useAuthState(auth);
  const [profileTab, setProfileTab] = useState(false);
  const [matchListTab, setMatchListTab] = useState(false);
  const [conversationsTab, setConversationsTab] = useState(false);
  const [adminDash, setAdminDash] = useState(false);
  const [fsUser, setFsUser] = useState(null);
  const [fsMatch, setFsMatch] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    if (user) {
      setProfileTab(true);
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
    const tabs = {
      'Conversations': () => toggleTabs(true, false, false, false),
      'Matches': () => toggleTabs(false, true, false, false),
      'Home': () => toggleTabs(false, false, true, false),
      'My Story': () => { }, // Handle My Story logic here
      'All Off': () => toggleTabs(false, false, false, false),
      'Logout': () => {
        toggleTabs(false, false, false, false);
        auth.signOut();
        // setFsUser(null);
      },
      'Admin': () => setAdminDash(!adminDash),
    };

    const tabHandler = tabs[renderCondition];
    if (tabHandler) {
      tabHandler();
    } else {
      console.log('switch default NAV');
    }
  };

  const toggleTabs = (conversations, matchList, profile, admin) => {
    setConversationsTab(conversations);
    setMatchListTab(matchList);
    setProfileTab(profile);
    setAdminDash(admin);
  };

  const updateFsUser = (updatedUser) => {
    setFsUser(updatedUser);
  };


  return (
    <div className="App">
      <div className='app-container'>
        <Nav user={user} navHandler={navHandler} fsUser={fsUser} />
        <div className='app-inner-container'>
          <div className='app-header'>
            <h1>SIMPATICO</h1>
            <p>Connecting with Others Who Have Experienced Loss</p>
          </div>

          <div className='app-body'>
            {error && <div>Error: {error.message}</div>}
            {
              user ? (user.emailVerified ? (
                <Dashboard
                  user={user}
                  fsUser={fsUser}
                  match={fsMatch}
                  profileTab={profileTab}
                  matchListTab={matchListTab}
                  adminDash={adminDash}
                  conversationsTab={conversationsTab}
                  navHandler={navHandler}
                  updateFsUser={updateFsUser}
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
