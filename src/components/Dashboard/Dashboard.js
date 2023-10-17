import './dashboard.css';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

import WelcomeMessage from './WelcomeMessage';
import MatchView from './MatchView/MatchView';
import Chatroom from './Chatroom/Chatroom';

import AdminDashboard from './AdminDashboard/AdminDashboard';
import { firestore } from '../../firebase-config';
import PropTypes from 'prop-types';
import { convoMutualConsentToggle, createConvo } from '../../helpers/firebaseHelpers'

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

  return (
    <IconContext.Provider value={{ className: "react-icons-dashboard" }}>
      <div className='dashboard-container'>
        {adminDash === true ?
          <AdminDashboard fsUser={fsUser} navHandler={navHandler} /> :
          <div className='dashboard-body'>
            { showWelcomeMessage === true &&
              <WelcomeMessage fsUser={fsUser} match={match} navHandler={navHandler} />
            }
            <MatchView match={match} fsUser={fsUser} />
            <Chatroom fsUser={fsUser} match={match} />
          </div>
        }
      </div>
    </IconContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  fsUser: PropTypes.object,
  profileTab: PropTypes.bool.isRequired,
  matchListTab: PropTypes.bool.isRequired,
  conversationsTab: PropTypes.bool.isRequired,
  adminDash: PropTypes.bool.isRequired,
  navHandler: PropTypes.func.isRequired,
};

export default Dashboard;
