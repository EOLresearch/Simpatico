import './dashboard.css';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import WelcomeMessage from './WelcomeMessage';
import Chatroom from './Chatroom/Chatroom';
import AdminDashboard from './AdminDashboard/AdminDashboard';

function Dashboard({
  userCreds,
  userProfile,
  fsUser,
  match,
  adminDash,
  navHandler,
  showWelcomeMessage,
  updateFsUser
}) {

  const [showChatWindow, setShowChatWindow] = useState(false);




  const chatHandler = (e, documentID) => {
    // setDocID(documentID);
    setShowChatWindow(true);
  }

  // first idea is that each user shold have a welcome message on their user record giving admins the power to give custom or pre-written welcome messages to each user- you have been matched with this person for this reason, etc. 

  return (
    <IconContext.Provider value={{ className: "react-icons-dashboard" }}>
      <div className='dashboard-container'>
        {adminDash === true ?
          <AdminDashboard userProfile={userProfile} navHandler={navHandler} /> :
          <div className='dashboard-body'>
            { showWelcomeMessage === true &&
              <WelcomeMessage userProfile={userProfile} match={match} navHandler={navHandler} />
            }
            <Chatroom userProfile={userProfile} match={match} />
          </div>
        }
      </div>
    </IconContext.Provider>
  );
}



export default Dashboard;
