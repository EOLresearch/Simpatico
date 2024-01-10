import './dashboard.css';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

import WelcomeMessage from './WelcomeMessage';
import Chatroom from './Chatroom/Chatroom';

import AdminDashboard from './AdminDashboard/AdminDashboard';
import { firestore } from '../../firebase-config';
import PropTypes from 'prop-types';
import { convoMutualConsentToggle, createConvo } from '../../helpers/firebasehelpers';

function Dashboard({
  user,
  fsUser,
  match,
  adminDash,
  navHandler,
  showWelcomeMessage,
  updateFsUser
}) {

  const { uid } = user;
  const [docID, setDocID] = useState();
  const [convoRequests, setConvoRequests] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const conversationsRef = firestore.collection('conversations');
  const convoQuery = conversationsRef.where("users", "array-contains", uid);
  const [convos] = useCollectionData(convoQuery);

  useEffect(() => {
    if (!convos) return;
    const requestArray = convos.filter(c => c.mutualConsent === false && c.userData.receiver.uid === fsUser.uid);
    setConvoRequests(requestArray);
    setShowNotification(requestArray.length > 0);
  }, [convos, fsUser]);

  const chatHandler = (e, documentID) => {
    setDocID(documentID);
    setShowChatWindow(true);
  }

  // first idea is that each user shold have a welcome message on their user record giving admins the power to give custom or pre-written welcome messages to each user- you have been matched with this person for this reason, etc. 

  return (
    <IconContext.Provider value={{ className: "react-icons-dashboard" }}>
      <div className='dashboard-container'>
        {adminDash === true ?
          <AdminDashboard fsUser={fsUser} navHandler={navHandler} /> :
          <div className='dashboard-body'>
            { showWelcomeMessage === true &&
              <WelcomeMessage fsUser={fsUser} match={match} navHandler={navHandler} />
            }
            <Chatroom fsUser={fsUser} match={match} />
          </div>
        }
      </div>
    </IconContext.Provider>
  );
}



export default Dashboard;
