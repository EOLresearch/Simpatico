import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import Profile from './Profile/Profile'

//TODO: component import-index refactor

import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

export default function Dashboard(props) {
  //TODO: TRY AND LIMIT THE AMOUNT OF TIMES YOU PASS FIREBASE DOWN
  //TODO: USERS SHOLD BE ABLE TO CHANGE THIER DETAILS
  //TODO: Create a user who us the super admin and is added to everyones match list for testing. this might mean querying tthe db for this admin user and passing it around the entire app

  const { firebase, matches, user, fsUser, profileTab, matchListTab, conversationsTab, navHandler } = props
  const { uid } = user;
  const firestore = firebase.firestore();
  const [docID, setDocID] = useState()
  const [convos, setConvos] = useState([])
  const [convoRequests, setConvoRequests] = useState([])

  const [showNotification, setShowNotification] = useState(false)
  const [showChatWindow, setShowChatWindow] = useState(false)

  useEffect(() => {
    if (!fsUser) return
    const conversationsRef = firestore.collection('conversations');
    const convoQuery = conversationsRef.where("users", "array-contains", fsUser.uid)
    convoQuery.get()
      .then((querySnapshot) => {
        let dataArr = []
        querySnapshot.forEach((doc) => {
          console.log("1 Doc Read")
          dataArr.push(doc.data())
        });
        setConvos(dataArr)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [firestore, fsUser])
  //CONVO query

  useEffect(() => {
    if (!convos) return
    const requestArray = convos.filter(c => c.mutualConsent === false)
    setConvoRequests(requestArray)
    if (requestArray.length > 0) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
    }
  }, [convos])
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
    setConvos([...convos, newConvo])
    
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

  function convoMutualConsentToggle(docID, boolean){
    setDocID(docID)
    const conversationsRef = firestore.collection('conversations');
    const conversationRef = conversationsRef.doc(docID);
    conversationRef.update({
      mutualConsent: boolean,
    })
    .then(() => {
      const updatedConvos = convos.map(c => {
        if (c.docID === docID) {
          return {...c, mutualConsent: boolean}
        } else {
          return c
        }
      })
      setConvos(updatedConvos)
      navHandler("Conversations")
      setShowChatWindow(true)
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
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
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
              <Profile user={fsUser} /> : null
          }
          {
            conversationsTab === true ?
              <Conversations chatHandler={chatHandler} docID={docID} showChatWindow={showChatWindow} firebase={firebase} convos={convos} fsUser={fsUser} /> : null
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
