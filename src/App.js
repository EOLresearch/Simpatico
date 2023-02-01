
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard'
//-----------------------------------------------------
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Nav from './components/Nav/Nav'
import { useState } from "react";


import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAxg7-rLpEzc7-4AE0l12lVJUbPFef2T2I",
  authDomain: "simpatico-a5b64.firebaseapp.com",
  projectId: "simpatico-a5b64",
  storageBucket: "simpatico-a5b64.appspot.com",
  messagingSenderId: "767358111176",
  appId: "1:767358111176:web:9003318c304d5422e8c4fd",
  measurementId: "G-VC7VQ32QB3"
})

const auth = firebase.auth();


function App() {
  const [user] = useAuthState(auth);

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [showMatchList, setShowMatchList] = useState(false)
  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [showConversationWindow, setShowConversationWindow] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)

  function navHandler(routeStr) {

    switch (routeStr) {
      case 'Conversations':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(true)
        setShowSurvey(false)
        return
      case 'Matches':
        setShowMatchList(true)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        setShowSurvey(false)
        return
      case 'Home':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(true)
        setShowConversationWindow(false)
        setShowSurvey(false)
        return
      case 'My Story':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        setShowSurvey(false)
        return
      case 'Matching Survey':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        setShowSurvey(true)
        return
      case 'All Off':
        setShowMatchList(false)
        setShowMatchDetails(false)
        setShowWelcomeMessage(false)
        setShowConversationWindow(false)
        setShowSurvey(false)
        return
      default:
        console.log('switch default NAV')
    }
  }


  return (
    <div className="App">
      <Nav auth={auth} navHandler={navHandler}/>
      {
        user ?
          <Dashboard
            auth={auth}
            firebase={firebase}
            showWelcomeMessage={showWelcomeMessage}
            showMatchList={showMatchList}
            showMatchDetails={showMatchDetails}
            showConversationWindow={showConversationWindow}
            showSurvey={showSurvey}
            navHandler={navHandler}
          /> : <UserAuth auth={auth} firebase={firebase} />
      }
    </div>
  );
}


export default App;