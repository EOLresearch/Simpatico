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
  //i want to add the functionality to change the color of the application at will, in css its all just opacities based on the background color so it should just come downto changing that.
  const [userProfile, setUserProfile] = useState(null);
  const userEmail = "fakeuser@example.com"; 


  

  const navHandler = (renderCondition) => {
    if (renderCondition === 'welcome') {
      setShowWelcomeMessage(false);
    } else if (renderCondition === 'adminDash') {
      setAdminDash(true);
    } else if (renderCondition === 'Dashboard') {
      setAdminDash(false);
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
        />

        <div className='app-inner-container'>
          <div className='app-body'>
            {error && <div>Error: {error.message}</div>}

            {cognitoUser && (
              // Render the Dashboard currently only if user is not null
              <Dashboard
                user={user}
                simpaticoMatch={simpaticoMatch} 
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