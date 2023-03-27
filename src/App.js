
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard/Dashboard'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Nav from './components/Nav/Nav'
import { useState } from "react";
// import { useCollectionData } from 'react-firebase-hooks/firestore';
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
  const [profileTab, setProfileTab] = useState(true)
  const [matchListTab, setMatchListTab] = useState(false)
  const [conversationsTab, setConversationsTab] = useState(false)


  function navHandler(renderCondition) {
    switch (renderCondition) {
      case 'Conversations':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(true)
        return
      case 'Matches':
        setProfileTab(false)
        setConversationsTab(false)
        setMatchListTab(true)
        return
      case 'Home':
        setMatchListTab(false)
        setConversationsTab(false)
        setProfileTab(true)
        return
      case 'My Story':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(false)
        return
      case 'All Off':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(false)
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
              user.emailVerified === true ?
                <Dashboard
                  firebase={firebase}
                  user={user}
                  profileTab={profileTab}
                  matchListTab={matchListTab}
                  conversationsTab={conversationsTab}
                  navHandler={navHandler}
                />

              : <UserAuth user={user} auth={auth} firebase={firebase} /> : <UserAuth auth={auth} firebase={firebase} />
          }
        </div>
      </div>
    </div>
  );
}
export default App;

