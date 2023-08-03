import './dashboard.css';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import Profile from './Profile/Profile'
import AdminDashboard from './AdminDashboard/AdminDashboard';
import { firestore } from '../../firebase-config';
import PropTypes from 'prop-types';
import { convoMutualConsentToggle, createConvo } from '../../helpers/firebaseHelpers'

function Dashboard({
  matches,
  user,
  fsUser,
  profileTab,
  matchListTab,
  conversationsTab,
  adminDash,
  navHandler,
  updateFsUser
}) {

  const { uid } = user;
  const [docID, setDocID] = useState();
  const [convoRequests, setConvoRequests] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const conversationsRef = firestore.collection('conversations');
  const convoQuery = conversationsRef.where("users", "array-contains", uid);
  const [convos] = useCollectionData(convoQuery, { idField: 'id' });

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
            <div className='sub-nav'>
              <div onClick={() => navHandler("Home")} className={profileTab ? "clicked" : null}>
                <RxPerson size="3rem" />My Profile
              </div>
              <div onClick={() => navHandler("Matches")} className={matchListTab ? "clicked" : null}>
                <IoPeopleCircleOutline size="3rem" />Matches
              </div>
              <div onClick={() => navHandler("Conversations")} className={conversationsTab ? "clicked" : null}>
                <IoChatbubblesSharp size="3rem" />Conversations
              </div>
              {showNotification && <span className="notification">{convoRequests.length}</span>}
            </div>
            {profileTab &&
              <Profile
                fsUser={fsUser}
                updateFsUser={updateFsUser}
                navHandler={navHandler} />}
            {conversationsTab &&
              <Conversations
                chatHandler={chatHandler}
                docID={docID}
                showChatWindow={showChatWindow}
                convos={convos}
                fsUser={fsUser}
                convoMutualConsentToggle={convoMutualConsentToggle} />}
            {matchListTab &&
              <MatchList
                fsUser={fsUser}
                matches={matches}
                createConvo={createConvo}
                convos={convos}
                convoMutualConsentToggle={convoMutualConsentToggle} />}
          </div>
        }
      </div>
    </IconContext.Provider>
  );
}

Dashboard.propTypes = {
  matches: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  fsUser: PropTypes.object.isRequired,
  profileTab: PropTypes.bool.isRequired,
  matchListTab: PropTypes.bool.isRequired,
  conversationsTab: PropTypes.bool.isRequired,
  adminDash: PropTypes.bool.isRequired,
  navHandler: PropTypes.func.isRequired,
  updateFsUser: PropTypes.func.isRequired,
};

export default Dashboard;
