import './dashboard.css';
import Conversation from './Conversation/Conversation'
import Nav from './Nav/Nav'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
//TODO: component import-index refactor

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Dashboard({ auth, firebase }) {
  const [showMatchList, setShowMatchList] = useState(true)

  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [openConversationWindow, setOpenConversationWindow] = useState(false)
  const [userToChatWith, setUserToChatWith] = useState()
  const [convoDocId, setConvoDocId] = useState()

  const { uid, email } = auth.currentUser;
  const firestore = firebase.firestore();

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);
  //TODO:Right now, this is ALL USERS that gets sent to the matchlist, we will need to be able to filter this by profile data when the time is right. 

  const userQuery = usersRef.where("email", "==", email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');

  function convoHandler(e, user) {
    e.preventDefault();
    setConvoDocId('')
    setOpenConversationWindow(false)
    setShowMatchDetails(false)
    setUserToChatWith(user)

    const docId1 = `${uid} + ${user.uid}`
    const docId2 = `${user.uid} + ${uid}`

    const a = conversationsRef.doc(docId1)
    const b = conversationsRef.doc(docId2)

    a.get().then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        setConvoDocId(docId1)
        setOpenConversationWindow(true)
      } else {
        console.log('else, now run b')
        b.get().then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setConvoDocId(docId2)
            setOpenConversationWindow(true)
          } else {
            setShowMatchDetails(true)
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      }
    })
  }


  async function createConvo(user) {
    // need more checks here to make sure conversations dont get erroneously made
    const docId = `${uid} + ${user.uid}`
    await conversationsRef.doc(docId).set({
      users: [uid, user.uid],
      isPrivate: true,
      docId: docId
    })
    setConvoDocId(docId)
    setOpenConversationWindow(true)
    setShowMatchDetails(false)
  }

  return (
    <div className='dashboard-wrapper'>
      <Nav fsUser={fsUser} />
      <div className='dashboard-body'>
        {
          showMatchList === true ?
            <MatchList currentUid={uid} users={users} convoHandler={convoHandler} /> : null
        }
        {
          openConversationWindow === true ?
            <Conversation firebase={firebase} userToChatWith={userToChatWith} convoDocId={convoDocId} /> : null
        }
        {
          showMatchDetails === true ?
            <MatchDetails userToChatWith={userToChatWith} createConvo={createConvo} /> : null
        }
      </div>
    </div>
  );

}
