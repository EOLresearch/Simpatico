import './dashboard.css';
import Conversations from './Conversations/Conversations'
import Nav from './Nav/Nav'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
import MatchingSurvey from './MatchingSurvey/MatchingSurvey'

//TODO: component import-index refactor

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { IconContext } from "react-icons";
// import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
// import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

export default function Dashboard({ auth, firebase }) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [showMatchList, setShowMatchList] = useState(false)
  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [showConversationWindow, setShowConversationWindow] = useState(false)
  //TODO: Renaming: these above need to correspond with the nav styles for which button is clicked, so if welcomemessage is showing - we need appropriate styles for that button while that is true.
  const [showSurvey, setShowSurvey] = useState(false)
  const [userToChatWith, setUserToChatWith] = useState({})


  const { uid, email, photoURL } = auth.currentUser;
  const firestore = firebase.firestore();

  const usersRef = firestore.collection('users');

  const [users] = useCollectionData(usersRef);
  //TODO:Right now, this is ALL USERS that gets sent to the matchlist, we will need to be able to filter this by profile data when the time is right. 

  const userQuery = usersRef.where("email", "==", email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');
  const myConvos = conversationsRef.where('users', 'array-contains', uid)
  const [convos = []] = useCollectionData(myConvos);


  function surveyDataCheck(user){
    if(user.cause === '' || user.deceased === ''){
      setShowSurvey(true)
    }
  }

  function convoHandler(e, user) {

    //the click from the match list does NOT need to do any document reads
    //lets get an exit clause here so the rest of the function doesnt have to run from match-list clicks where conversations have already been created and in the component tree. 

    e.preventDefault();
    if (user === "no user") {
      setShowMatchDetails(false)
      return
    }
    setShowConversationWindow(false)
    setShowMatchDetails(false)
    setUserToChatWith(user)

    const docId1 = `${uid} + ${user.uid}`
    const docId2 = `${user.uid} + ${uid}`

    const a = conversationsRef.doc(docId1)
    const b = conversationsRef.doc(docId2)

    a.get().then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        setShowConversationWindow(true)
        setShowMatchList(false)
      } else {
        console.log('else, now run b')
        b.get().then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setShowConversationWindow(true)
            setShowMatchList(false)
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
      userData: {
        sender: fsUser[0],
        receiver: user,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      docId: docId,
      mutualConsent: false,
    })
    setShowConversationWindow(true)
    setShowMatchList(false)
    setShowMatchDetails(false)
  }

  //TODO: nav is not responsive, need a hamburger menu to crash into

  function navHandler(e) {
    switch (e.target.dataset.identifier) {
      case 'Conversations':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(true)
        return
      case 'Matches':
        setShowMatchList(true)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        return
      case 'Home':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(true)
        setShowConversationWindow(false)
        return
      case 'My Story':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        return
      case 'My Details':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        return
      default:
        console.log('switch default NAV')
    }

  }


  return (
    <div className='dashboard-wrapper'>
      <Nav fsUser={fsUser} auth={auth} navHandler={navHandler} />
      <div className='dashboard-body'>
        {
          showWelcomeMessage === true ?
            <WelcomeMessage /> : null
          //this component is in THIS FILE
        }
        {
          showMatchList === true ?
            <MatchList currentUid={uid} users={users} convoHandler={convoHandler} /> : null
        }
        {
          showConversationWindow === true ?
            <Conversations firebase={firebase} convos={convos} fsUser={fsUser[0]} /> : null
        }
        {
          showMatchDetails === true ?
            <MatchDetails userToChatWith={userToChatWith} convoHandler={convoHandler} createConvo={createConvo} /> : null
        }
        {
          showSurvey === true ?
            <MatchingSurvey firebase={firebase}/> : null
        }
      </div>
    </div>
  );

}

function WelcomeMessage() {
  //this, of course, needs massive overhaul and is not repsonsive at all
  return (
    <IconContext.Provider value={{ className: "react-icons-welcome" }}>
      <div className='welcome'>
        <div className='hero-image'> this is a pretty image that grabs peoples eyes and directs them downward</div>
        <div className='welcome-body'>
          <h1>Simpatico</h1>
          <h3>Home Page Welcome Message</h3>
          <div className='callouts'>
            <div>callout to center site?</div>
            <div>callout to weillcornell proper?</div>
            <div>callout to another resource?</div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}