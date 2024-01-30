import React, { useState, useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import UserAuth from './components/UserAuth/UserAuth';
import { useAuth } from './components/UserAuth/AuthContext';

function App() {
  const { user, signIn, signOut } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [adminDash, setAdminDash] = useState(false);
  const [fsUser, setFsUser] = useState(null); // no more firestore, this is now a mysql stored user to sinc with the cognito user 
  const [fsMatch, setFsMatch] = useState(null); // lets rename to simpaticoMatch
  const [error, setError] = useState(null);
  //will need a useEffect to fetch the user, the user's conversations, and the user's contacts


  const navHandler = (renderCondition) => {
    if (renderCondition === 'welcome') {
      setShowWelcomeMessage(false);
    } else if (renderCondition === 'Logout') {
      setShowWelcomeMessage(false);
      setFsUser(null);
      setFsMatch(null);
    }
  }
  console.log('Received user in component:', user);
  return (
      <div className="App">
        <div className='app-container'>
          <Nav
            navHandler={navHandler}
            adminDash={adminDash}
          />

          <div className='app-inner-container'>
            <div className='app-body'>
              {error && <div>Error: {error.message}</div>}

              {user && (
                // Render the Dashboard currently only if user is not null
                <Dashboard
                  user={user}
                  match={fsMatch}
                  adminDash={adminDash}
                  navHandler={navHandler}
                  showWelcomeMessage={showWelcomeMessage}
                />
              )}

              {!user && <UserAuth />}
            </div>
          </div>
        </div>
      </div>
  );
}

export default App; 