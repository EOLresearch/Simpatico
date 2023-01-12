import './dashboard.css';
import Conversation from './Conversation/Conversation'
import Profile from './Profile/Profile'
import MatchList from './MatchList/MatchList'
import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Dashboard({ firebase, user }) {
  const [openConversationWindow, setOpenConversationWindow] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [convoDocId, setConvoDocId] = useState()

  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);
  const userQuery = usersRef.where("email", "==", user.email)
  const [fsUser] = useCollectionData(userQuery);

  function activateConversationWindow(user, docId){
    setOpenConversationWindow(!openConversationWindow)
    setSelectedUser(user)
    setConvoDocId(docId)
  }

  return (
    <div className='dashboard-wrapper'>
      <Profile fsUser={fsUser} />
      <MatchList firebase={firebase} users={users} activateConversationWindow={activateConversationWindow} />
      {
        openConversationWindow === true ?
        <Conversation firebase={firebase} userToChatWith={selectedUser} convoDocId={convoDocId}/> : null
      }
    </div>
  );

}
