import React, { useState, useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import UserAuth from './components/UserAuth/UserAuth';
import { useAuth } from './components/UserAuth/AuthContext';

function App() {
  const { cognitoUser, signIn, signOut } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [adminDash, setAdminDash] = useState(false);
  const [user, setUser] = useState(null);
  const [simpaticoMatch, setSimpaticoMatch] = useState(null);
  const [error, setError] = useState(null);

  //will need a useEffect to fetch the user, the user's conversations, and the user's contacts


  const navHandler = (renderCondition) => {
    if (renderCondition === 'welcome') {
      setShowWelcomeMessage(false);
    } else if (renderCondition === 'Logout') {
      setShowWelcomeMessage(false);
      setUser(null);
      simpaticoMatch(null);
    }
  }
  console.log('Received user in component:', cognitoUser);
  
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

            {cognitoUser && (
              // Render the Dashboard currently only if user is not null
              <Dashboard
                user={user}
                simpaticoMatch={simpaticoMatch}
                adminDash={adminDash}
                navHandler={navHandler}
                showWelcomeMessage={showWelcomeMessage}
              />
            )}

            {!cognitoUser && <UserAuth />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 