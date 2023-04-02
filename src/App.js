
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard/Dashboard'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Nav from './components/Nav/Nav'
import { useState, useEffect } from "react";
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
  const [fsUser, setFsUser] = useState()
  const [matches, setMatches] = useState([])
  const [convos, setConvos] = useState([])
  const firestore = firebase.firestore();

  useEffect(() => {
    if (!user) return
    const usersRef = firestore.collection('users');
    const userQuery = usersRef.where("email", "==", user.email)
    userQuery.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("1 Doc Read")
          setFsUser(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [firestore, user])

  useEffect(() => { 
    if (!fsUser) return
    const usersRef = firestore.collection('users');
    const matchQuery = usersRef.where("cause", "==", fsUser.cause).where("deceased", "==", fsUser.deceased)
    matchQuery.get()
    // going to need to limit the amount of matches returned at some point to limit doc reads
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("1 Doc Read")
          setMatches(prevState => [...prevState, doc.data()])
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [firestore, fsUser])

  useEffect(() => {
    if (!fsUser) return
    const conversationsRef = firestore.collection('conversations');
    const myConvos = conversationsRef.where('users', 'array-contains', fsUser.uid)
    myConvos.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("1 Doc Read")
          setConvos(prevState => [...prevState, doc.data()])
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [firestore, fsUser])



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
            <p>Connecting with Others Who Have Experienced Loss</p>
          </div>
          {
            user ?
              user.emailVerified === true ?
                <Dashboard
                  firebase={firebase}
                  user={user}
                  fsUser={fsUser}
                  matches={matches}
                  convos={convos}
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

