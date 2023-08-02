import React from 'react';
import UserAuth from './components/UserAuth/UserAuth';
import Dashboard from './components/Dashboard/Dashboard';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase Configuration
import firebaseConfig from './firebase-config'; // Create a separate file for Firebase config

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Custom hook for user query
function useUserQuery(user) {
  const [fsUser, setFsUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    const usersRef = firestore.collection('users');
    const userQuery = usersRef.where('email', '==', user.email);

    userQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('1 Doc Read');
        setFsUser(doc.data());
      });
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }, [user]);

  return fsUser;
}

// Custom hook for match query
function useMatchQuery(fsUser) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!fsUser) return;
    const usersRef = firestore.collection('users');
    const matchQuery = usersRef.where('cause', '==', fsUser.cause).where('kinship', '==', fsUser.kinship);

    matchQuery.get().then((querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        console.log('1 Doc Read');
        dataArr.push(doc.data());
      });
      setMatches(dataArr);
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }, [fsUser]);

  return matches;
}

function App() {
  const [user] = useAuthState(auth);
  const [profileTab, setProfileTab] = useState(false);
  const [matchListTab, setMatchListTab] = useState(false);
  const [conversationsTab, setConversationsTab] = useState(false);
  const [adminDash, setAdminDash] = useState(false);

  // Use the custom hooks to get the fsUser and matches
  const fsUser = useUserQuery(user);
  const matches = useMatchQuery(fsUser);

  useEffect(() => {
    if (user) {
      setProfileTab(true);
    }
  }, [user]);

  // Simplified navHandler function
  function navHandler(renderCondition) {
    const tabs = {
      'Conversations': ( )=> {
        setConversationsTab(true);
        setMatchListTab(false);
        setProfileTab(false);
        setAdminDash(false);
      },
      'Matches': () => {
        setMatchListTab(true);
        setProfileTab(false);
        setConversationsTab(false);
        setAdminDash(false);
      },
      'Home': () => {
        setMatchListTab(false);
        setProfileTab(true);
        setConversationsTab(false);
        setAdminDash(false);
      },
      'My Story': () => {}, // Handle My Story logic here
      'All Off': () => {
        setMatchListTab(false);
        setProfileTab(false);
        setConversationsTab(false);
        setAdminDash(false);
      },
      'Logout': () => {
        setMatchListTab(false);
        setProfileTab(false);
        setConversationsTab(false);
        setAdminDash(false);
        auth.signOut();
      },
      'Admin': () => setAdminDash(!adminDash),
    };

    const tabHandler = tabs[renderCondition];
    if (tabHandler) {
      tabHandler();
    } else {
      console.log('switch default NAV');
    }
  }

  return (
    <div className="App">
      <div className='app-container'>
        <Nav user={user} auth={auth} navHandler={navHandler} fsUser={fsUser} />
        <div className='app-inner-container'>
          <div className='app-header'>
            <h1>SIMPATICO</h1>
            <p>Connecting with Others Who Have Experienced Loss</p>
          </div>

          <div className='app-body'>
            {
              user ? (user.emailVerified ? (
                <Dashboard
                  firebase={firebase}
                  user={user}
                  fsUser={fsUser}
                  matches={matches}
                  profileTab={profileTab}
                  matchListTab={matchListTab}
                  adminDash={adminDash}
                  conversationsTab={conversationsTab}
                  navHandler={navHandler}
                />
              ) : (
                <UserAuth user={user} auth={auth} firebase={firebase} />
              )) : (
                <UserAuth auth={auth} firebase={firebase} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
