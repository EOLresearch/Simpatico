import './dashboard.css';
import Conversation from './Conversation/Conversation'
import Profile from './Profile/Profile'
import MatchList from './MatchList/MatchList'

import { useState } from "react";

// import React, { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// import { getAuth } from "firebase/auth";

export default function Dashboard({ firebase, user }) {
  const [openConversationWindow, setOpenConversationWindow] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  //account options - details to add or update.
  // const auth = getAuth();
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const userQuery = usersRef.where("email", "==", user.email)
  const [fsUser] = useCollectionData(userQuery);

  const [users] = useCollectionData(usersRef);

  const activateConversationWindow = (user) => {
    setOpenConversationWindow(!openConversationWindow)
    setSelectedUser(user)
  }

  return (
    <div className='dashboard-wrapper'>
      <Profile fsUser={fsUser} />
      <MatchList firebase={firebase} users={users} activateConversationWindow={activateConversationWindow} />
      {
        openConversationWindow === true ?
        <Conversation firebase={firebase} fsUser={fsUser} userToChatWith={selectedUser} /> : null
      }
    </div>
  );

}
