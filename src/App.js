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

function App() {
  const [user] = useAuthState(auth);
  const [profileTab, setProfileTab] = useState(false)
  const [matchListTab, setMatchListTab] = useState(false)
  const [conversationsTab, setConversationsTab] = useState(false)
  const [adminDash, setAdminDash] = useState(false)
  const [fsUser, setFsUser] = useState()
  const [matches, setMatches] = useState([])
  const firestore = firebase.firestore();

  useEffect(() => {
    if (!user) return
    setProfileTab(true)
  }, [user])


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
  //USER QUERY

  useEffect(() => {
    if (!fsUser) return
    const usersRef = firestore.collection('users');
    const matchQuery = usersRef.where("cause", "==", fsUser.cause).where("kinship", "==", fsUser.kinship)
    matchQuery.get()
      .then((querySnapshot) => {
        let dataArr = []
        querySnapshot.forEach((doc) => {
          console.log("1 Doc Read")
          dataArr.push(doc.data())
        });
        setMatches(dataArr)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [firestore, fsUser])
  //MATCH query

  function navHandler(renderCondition) {
    switch (renderCondition) {
      case 'Conversations':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(true)
        setAdminDash(false)
        return
      case 'Matches':
        setProfileTab(false)
        setConversationsTab(false)
        setMatchListTab(true)
        setAdminDash(false)
        return
      case 'Home':
        setMatchListTab(false)
        setConversationsTab(false)
        setProfileTab(true)
        setAdminDash(false)
        return
      case 'My Story':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(false)
        setAdminDash(false)
        return
      case 'All Off':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(false)
        setAdminDash(false)
        return
      case 'Logout':
        setMatchListTab(false)
        setProfileTab(false)
        setConversationsTab(false)
        setAdminDash(false)
        auth.signOut()
        return
      case 'Admin':

        setAdminDash(!adminDash)
        return

      default:
        console.log('switch default NAV')
    }
  }

  function updateFsUser(newFsUser) {
    setFsUser(newFsUser)
  }

  return (
    <div className="App">
      <div className='app-container'>
        <Nav user={user} auth={auth} navHandler={navHandler} fsUser={fsUser} />
        <div className='app-inner-container'>
          <div className='app-header'>
            <h1>SIMPATICO</h1>
            <p>Connecting with Others Who Have Experienced Loss</p>
          </div>

          <div className='app-body'>

            {
              user ?
                user.emailVerified === true ?
                  <Dashboard
                    firebase={firebase}
                    user={user}
                    fsUser={fsUser}
                    matches={matches}
                    profileTab={profileTab}
                    matchListTab={matchListTab}
                    adminDash={adminDash}
                    conversationsTab={conversationsTab}
                    navHandler={navHandler}
                    updateFsUser={updateFsUser}
                  />
                  : <UserAuth user={user} auth={auth} firebase={firebase} /> : <UserAuth auth={auth} firebase={firebase} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

