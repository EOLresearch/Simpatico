
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard/Dashboard'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';    
import 'firebase/compat/firestore';
import Nav from './components/Nav/Nav'
import { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
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

//Conditional rendering vs React router?

function App() {
  const [user] = useAuthState(auth);
  const [profileView, setProfileView] = useState(true)
  const [matchList, setMatchList] = useState(false)
  const [conversationsIndex, setConversationsIndex] = useState(false)
  const [primarySurvey, setPrimarySurvey] = useState(false)

  const firestore = firebase.firestore();

  function navHandler(renderCondition) {

    // TODO:: need to doa check here for the user and redirect to login if not logged whenever any routing is attempted

    switch (renderCondition) {
      case 'Conversations':
        setMatchList(false)
        setProfileView(false)
        setPrimarySurvey(false)
        setConversationsIndex(true)
        return
      case 'Matches':
        setProfileView(false)
        setConversationsIndex(false)
        setPrimarySurvey(false)
        setMatchList(true)
        return
      case 'Home':
        setMatchList(false)
        setConversationsIndex(false)
        setPrimarySurvey(false)
        setProfileView(true)
        return
      case 'My Story':
        setMatchList(false)
        setProfileView(false)
        setConversationsIndex(false)
        setPrimarySurvey(false)
        return
      case 'Matching Survey':
        setMatchList(false)
        setProfileView(false)
        setConversationsIndex(false)
        setPrimarySurvey(true)
        return
      case 'All Off':
        setMatchList(false)
        setProfileView(false)
        setConversationsIndex(false)
        setPrimarySurvey(false)
        return
      default:
        console.log('switch default NAV')
    }
  }
  return (
    <div className="App">
      <div className='app-container'>
        <Nav user={user} auth={auth} navHandler={navHandler} />
        <div className='nav-dummy'>
          {/* app inner container is not centered properly without this dummy so wdith in CSS must be the same as the nav container  */}
        </div>
        <div className='app-inner-container'>
          <div className='app-header'>
            <h1>SIMPATICO</h1>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis </p>
          </div>
          {
            user ?
              <Dashboard
                firebase={firebase}
                user={user}
                profileView={profileView}
                matchList={matchList}
                conversationsIndex={conversationsIndex}
                primarySurvey={primarySurvey}
                navHandler={navHandler}
              />

              : <UserAuth auth={auth} firebase={firebase} />
          }
        </div>
      </div>
    </div>
  );
}
export default App;

