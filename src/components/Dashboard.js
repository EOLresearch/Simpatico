import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
import MatchingSurvey from './MatchingSurvey/MatchingSurvey'
import Profile from './Profile/Profile'
import RegistrationPanel from './UserAuth//RegistrationPanel';



//TODO: component import-index refactor

import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

import { useState, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconContext } from "react-icons";

export default function Dashboard(props) {
  const { firebase, user, profileView, matchList, matchDetails, conversationsIndex, primarySurvey, navHandler } = props
  const { uid, email, photoURL } = user;
  const firestore = firebase.firestore();
  const [userToChatWith, setUserToChatWith] = useState({})
  const [regPanel, setRegPanel] = useState(false)

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);

  const userQuery = usersRef.where("email", "==", email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');
  const myConvos = conversationsRef.where('users', 'array-contains', uid)
  const [convos = []] = useCollectionData(myConvos);

  const auth = firebase.auth();


  useEffect(()=>{
  
    if ( fsUser ) {
      const user = fsUser[0]
      if (user.cause == "") {
        setRegPanel(true)
      }
    }

  }, [fsUser])

  function convoHandler(e, user) {
    e.preventDefault();

    navHandler("All Off")
    setUserToChatWith(user)

    const docId1 = `${uid} + ${user.uid}`
    const docId2 = `${user.uid} + ${uid}`

    const a = conversationsRef.doc(docId1)
    const b = conversationsRef.doc(docId2)

    a.get().then((doc) => { 
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        navHandler("Conversations")
      } else {
        console.log('else, now run b')
        b.get().then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            navHandler("Conversations")
          } else {
            navHandler("Matches")
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
    navHandler("Conversations")
  }

  const clickedProfile = profileView === true ? "clicked" : null
  const clickedMatches = matchList === true ? "clicked" : null
  const clickedConversations = conversationsIndex === true ? "clicked" : null


  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      <div className='dashboard-container'>
        <div className='dashboard-body'>
          <div className='sub-nav'>
            <div onClick={e => navHandler("Home")} className={clickedProfile}><RxPerson size="3rem" />My Profile</div>
            <div onClick={e => navHandler("Matches")} className={clickedMatches}><IoPeopleCircleOutline size="3rem" />Matches</div>
            <div onClick={e => navHandler("Conversations")} className={clickedConversations}><IoChatbubblesSharp size="3rem" />Conversations</div>
            {/* this needs to be its own component? */}
          </div>
          {
            regPanel === true ? fsUser ?
              <RegistrationPanel auth={auth} firestore={firestore} user={fsUser[0]} registrationDisplaySwitch={null}/> : null : null
          }

          {
            profileView === true ? fsUser ?
              <Profile user={fsUser[0]} /> : null : null
          }
          {
            matchList === true ?
              <MatchList currentUid={uid} users={users} createConvo={createConvo} /> : null
          }
          {
            conversationsIndex === true ? fsUser ?
              <Conversations firebase={firebase} convos={convos} fsUser={fsUser[0]} /> : null : null
          }
          {
            matchDetails === true ?
              <MatchDetails userToChatWith={userToChatWith} convoHandler={convoHandler} createConvo={createConvo} /> : null
          }
          {
            primarySurvey === true ?
              <MatchingSurvey firebase={firebase} /> : null
          }
        </div>
      </div>
    </IconContext.Provider>
  );

}
