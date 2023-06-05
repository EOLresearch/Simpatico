import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import Profile from './Profile/Profile'

//TODO: component import-index refactor

import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Dashboard(props) {
  //TODO: TRY AND LIMIT THE AMOUNT OF TIMES YOU PASS FIREBASE DOWN
  //TODO: USERS SHOLD BE ABLE TO CHANGE THIER DETAILS
  //TODO: Create a user who us the super admin and is added to everyones match list for testing. this might mean querying tthe db for this admin user and passing it around the entire app

  const { firebase, matches, user, fsUser, profileTab, matchListTab, conversationsTab, navHandler } = props
  const { uid } = user;
  const firestore = firebase.firestore();
  const [docID, setDocID] = useState()
  const [convoRequests, setConvoRequests] = useState([])

  const [showNotification, setShowNotification] = useState(false)
  const [showChatWindow, setShowChatWindow] = useState(false)

  const conversationsRef = firestore.collection('conversations');
  const convoQuery = conversationsRef.where("users", "array-contains", uid)
  const [convos] = useCollectionData(convoQuery, { idField: 'id' });

  useEffect(() => {
    if (!convos) return
    const requestArray = convos.filter(c => c.mutualConsent === false && c.userData.receiver.uid === fsUser.uid)
    setConvoRequests(requestArray)
    if (requestArray.length > 0) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
    }
  }, [convos, fsUser])
  //CONVO REQUESTS

  function createConvo(e, message, user) {
    e.preventDefault()

    const documentID = `${uid} + ${user.uid}`
    setDocID(documentID)
    const conversationsRef = firestore.collection('conversations');
    const conversationRef = conversationsRef.doc(documentID);

    const newConvo = {
      users: [uid, user.uid],
      userData: {
        sender: fsUser,
        receiver: user,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      docID: documentID,
      mutualConsent: false,
      firstMessage: message,
    }
    conversationRef.set(newConvo)

    const msgDocRef = conversationRef.collection('messages').doc()
    msgDocRef.set({
      mid: msgDocRef.id,
      body: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFromUid: uid,
      sentFromDisplayName: fsUser.displayName,
      photoURL: fsUser.photoURL,
    })

    navHandler("Conversations")
    setShowChatWindow(true)
  }

  function convoMutualConsentToggle(docID, boolean) {
    setDocID(docID)
    const conversationsRef = firestore.collection('conversations');
    const conversationRef = conversationsRef.doc(docID);
    conversationRef.update({
      mutualConsent: boolean,
    })
      .then(() => {
        const updatedConvos = convos.map(c => {
          if (c.docID === docID) {
            return { ...c, mutualConsent: boolean }
          } else {
            return c
          }
        })
        setShowChatWindow(true)
        navHandler("Conversations")

        console.log("Document successfully updated!");
      })
  }

  const clickedProfile = profileTab === true ? "clicked" : null
  const clickedMatches = matchListTab === true ? "clicked" : null
  const clickedConversations = conversationsTab === true ? "clicked" : null
  
  function chatHandler(e, documentID) {
    setDocID(documentID)
    setShowChatWindow(true)
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-dashboard" }}>
      <div className='dashboard-container'>
        <div className='dashboard-body'>
          <div className='sub-nav'>
            <div onClick={e => navHandler("Home")} className={clickedProfile}><RxPerson size="3rem" />My Profile</div>
            <div onClick={e => navHandler("Matches")} className={clickedMatches}><IoPeopleCircleOutline size="3rem" />Matches</div>
            <div onClick={e => navHandler("Conversations")} className={clickedConversations}><IoChatbubblesSharp size="3rem" />Conversations</div>
            {
              showNotification === true ?
                <span className="notification">{convoRequests.length}</span> : null
            }
          </div>
          {
            profileTab === true ?
              <Profile firestore={firestore} user={fsUser} /> : null
          }
          {
            conversationsTab === true ?
              <Conversations chatHandler={chatHandler} docID={docID} showChatWindow={showChatWindow} firebase={firebase} convos={convos} fsUser={fsUser} convoMutualConsentToggle={convoMutualConsentToggle} /> : null
          }
          {
            matchListTab === true ?
              <MatchList fsUser={fsUser} matches={matches} createConvo={createConvo} convos={convos} convoMutualConsentToggle={convoMutualConsentToggle} /> : null
          }
        </div>
      </div>
    </IconContext.Provider>
  );
}
