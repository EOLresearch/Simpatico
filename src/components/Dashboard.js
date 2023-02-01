import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
import MatchingSurvey from './MatchingSurvey/MatchingSurvey'

//TODO: component import-index refactor

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconContext } from "react-icons";

export default function Dashboard(props) {
  const { firebase, user, welcomeMessage, matchList, matchDetails, conversationsIndex, primarySurvey, navHandler } = props
  const { uid, email, photoURL } = user;
  const firestore = firebase.firestore();
  const [userToChatWith, setUserToChatWith] = useState({})

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);

  const userQuery = usersRef.where("email", "==", email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');
  const myConvos = conversationsRef.where('users', 'array-contains', uid)
  const [convos = []] = useCollectionData(myConvos);

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


  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-body'>
        {
          welcomeMessage === true ?
            <WelcomeMessage /> : null
          //this component is in THIS FILE
        }
        {
          matchList === true ?
            <MatchList currentUid={uid} users={users} convoHandler={convoHandler} /> : null
        }
        {
          conversationsIndex === true ?
            <Conversations firebase={firebase} convos={convos} fsUser={fsUser[0]} /> : null
        }
        {
          matchDetails === true ?
            <MatchDetails userToChatWith={userToChatWith} convoHandler={convoHandler} createConvo={createConvo} /> : null
        }
        {
          primarySurvey === true ?
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
        <div className='hero-image'> 
          {/* <img src={welcomeHeroImg} /> */}
        </div>
        <div className='welcome-body'>
          <h1>Simpatico</h1>
          <h3>Home Page Welcome Message</h3>
          <p>This is where we can introduce the study and details on how best to use this app.</p>
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