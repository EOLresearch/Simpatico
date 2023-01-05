import './dashboard.css';
import PrivateChat from './PrivateChat/PrivateChat'
import Profile from './Profile/Profile'
import MatchList from './MatchList/MatchList'

import { useState } from "react";

// import React, { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';



// import { getAuth } from "firebase/auth";

export default function Dashboard({ firebase, user }) {
  const [openChatWindow, setOpenChatWindow] = useState(false)
  const [selectedUser, setSelectedUser] = useState()



  //account options - details to add or update.
  // const auth = getAuth();
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const userQuery = usersRef.where("email", "==", user.email)
  const [fsUser] = useCollectionData(userQuery);

  const [users] = useCollectionData(usersRef);

  const activateChatWindow = (user) => {
    setOpenChatWindow(!openChatWindow)
    setSelectedUser(user)
  }

  return (
    <div className='dashboard-wrapper'>
      <Profile fsUser={fsUser} />
      <MatchList users={users} activateChatWindow={activateChatWindow} />
      {
        openChatWindow === true ?
          <PrivateChat firebase={firebase} fsUser={fsUser} userToChatWith={selectedUser} /> : null
      }
    </div>
  );

}
