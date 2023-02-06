import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
import MatchingSurvey from './MatchingSurvey/MatchingSurvey'
import Profile from './Profile/Profile'


//TODO: component import-index refactor
import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    <div className='dashboard-container'>
      {/* <div className='auth-header'>
        <h1>SIMPATICO</h1>
        <p>Connect with people who have experienced similar types of loss</p>
      </div> */}
      <div className='dashboard-body'>

        {
          welcomeMessage === true ? fsUser ?
            <Profile user={fsUser[0]} /> : null : null
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
            <MatchingSurvey firebase={firebase} /> : null
        }
      </div>
    </div>
  );

}
