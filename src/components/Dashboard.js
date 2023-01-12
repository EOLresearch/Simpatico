import './dashboard.css';
import Conversation from './Conversation/Conversation'
import Profile from './Profile/Profile'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Dashboard({ firebase, user }) {
  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [openConversationWindow, setOpenConversationWindow] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [convoDocId, setConvoDocId] = useState()

  const auth = firebase.auth();
  const { uid } = auth.currentUser;
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);
  const userQuery = usersRef.where("email", "==", user.email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');

  function activateConversationWindow(user, docId){
    setOpenConversationWindow(!openConversationWindow)
    setSelectedUser(user)
  }

  //TODO:: REFACTOR THIS FUNCTION after MVP
  function convoHandler(e, user) {
    e.preventDefault();
    const docId1 = `${uid} + ${user.uid}`
    const docId2 = `${user.uid} + ${uid}`

    const a = conversationsRef.doc(docId1)
    const b = conversationsRef.doc(docId2)

    a.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setConvoDocId(docId1)
      } else {
        checkMatch(user)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    b.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setConvoDocId(docId2)
      } else {
        checkMatch(user)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function checkMatch(user){
    //modal - this person's details with a button that says "Start a conversation?"
    setShowMatchDetails(true)

  }

  async function createConvo(user){
    const docId = `${uid} + ${user.uid}`
    await conversationsRef.doc(docId).set({
      users: [uid, user.uid],
      isPrivate: true,
      docId: docId
    })
    activateConversationWindow(user, docId)
  }

  return (
    <div className='dashboard-wrapper'>
      <Profile fsUser={fsUser} />
      <MatchList firebase={firebase} users={users} convoHandler={convoHandler} />
      {
        openConversationWindow === true ?
        <Conversation firebase={firebase} userToChatWith={selectedUser} convoDocId={convoDocId}/> : null
      }
      {
        showMatchDetails === true ?
        <MatchDetails /> : null
      }
    </div>
  );

}
