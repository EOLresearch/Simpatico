import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import Profile from './Profile/Profile'

//TODO: component import-index refactor

import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconContext } from "react-icons";

export default function Dashboard(props) {
  //TODO: TRY AND LIMIT THE AMOUNT OF TIMES YOU PASS FIREBASE DOWN
  //TODO: USERS SHOLD BE ABLE TO CHANGE THIER DETAILS
  //TODO: Create a user who us the super admin and is added to everyones match list for testing. this might mean querying tthe db for this admin user and passing it around the entire app

  const { firebase, user, matches, convos, fsUser, profileTab, matchListTab, conversationsTab, navHandler } = props
  const { uid, email } = user;
  const firestore = firebase.firestore();
  const [convoRequest, setConvoRequest] = useState([])

  const [showChatWindow, setShowChatWindow] = useState(false)
  const [docID, setDocID] = useState()

  useEffect(() => {
    if (!convos) return
    const requestArray = convos.filter(c => c.mutualConsent === false)
    setConvoRequest(requestArray)
  }, [convos])

  //convos, fsUser, and Matches are all the doc reads here. 
  //with convos we can do notifcations

//lets get one doc that gets created for each user with a finite list of matches, that way we can do 1 doc read with all matches. thats one way to ge tthese down. 

  function chatHandler(e, documentID) {
    setDocID(documentID)
    setShowChatWindow(true)
  }

  function createConvo(e, message, user) {
    e.preventDefault()

    const documentID = `${uid} + ${user.uid}`
    setDocID(documentID)
    const conversationsRef = firestore.collection('conversations');
    const conversationRef = conversationsRef.doc(documentID);

    conversationRef.set({
      users: [uid, user.uid],
      userData: {
        sender: fsUser,
        receiver: user,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      docID: documentID,
      mutualConsent: false,
    })

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

  const clickedProfile = profileTab === true ? "clicked" : null
  const clickedMatches = matchListTab === true ? "clicked" : null
  const clickedConversations = conversationsTab === true ? "clicked" : null

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      <div className='dashboard-container'>
        <div className='dashboard-body'>
          <div className='sub-nav'>
            <div onClick={e => navHandler("Home")} className={clickedProfile}><RxPerson size="3rem" />My Profile</div>
            <div onClick={e => navHandler("Matches")} className={clickedMatches}><IoPeopleCircleOutline size="3rem" />Matches</div>
            <div onClick={e => navHandler("Conversations")} className={clickedConversations}><IoChatbubblesSharp size="3rem" />Conversations</div>
          </div>
          {
            profileTab === true ?
              <Profile user={fsUser} /> : null
          }
          {
            conversationsTab === true ?
              <Conversations chatHandler={chatHandler} docID={docID} showChatWindow={showChatWindow} firebase={firebase} convos={convos} fsUser={fsUser} /> : null
          }
          {
            matchListTab === true ?
              <MatchList fsUser={fsUser} matches={matches} createConvo={createConvo} convos={convos} /> : null
          }
        </div>
      </div>
    </IconContext.Provider>
  );
}
