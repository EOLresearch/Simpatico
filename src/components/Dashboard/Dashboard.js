import './dashboard.css';
import Conversations from './Conversations/Conversations'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
import MatchingSurvey from './MatchingSurvey/MatchingSurvey'
import Profile from './Profile/Profile'

//TODO: component import-index refactor

import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconContext } from "react-icons";

export default function Dashboard(props) {
  //TODO: TRY AND LIMIT THE AMOUNT OF TIMES YOU PASS FIREBASE DOWN
  const { firebase, user, profileView, matchList, matchDetails, conversationsIndex, primarySurvey, navHandler } = props
  const { uid, email, photoURL } = user;
  const firestore = firebase.firestore();

  const [userToChatWith, setUserToChatWith] = useState({})
  const [fsUser, setFsUser] = useState()
  const [matches, setMatches] = useState([])
  // const [deceasedMatches, setDeceasedMatches] = useState([])

  const conversationsRef = firestore.collection('conversations');
  const myConvos = conversationsRef.where('users', 'array-contains', uid)
  const [convos = []] = useCollectionData(myConvos);

  const usersRef = firestore.collection('users');
  const userQuery = usersRef.where("email", "==", email)

  useEffect(() => {
    userQuery.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setFsUser(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [])


  useEffect(() => {
    if (!fsUser) return

    const matchQuery = usersRef.where("cause", "==", fsUser.cause).where("deceased", "==", fsUser.deceased)
    matchQuery.get()
      .then((querySnapshot) => {
        let dataArr = []
        querySnapshot.forEach((doc) => {
          dataArr.push(doc.data())
        })
        setMatches(dataArr)
      })

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
        navHandler("Conversations")
      } else {
        console.log('else, now run b')
        b.get().then((doc) => {
          if (doc.exists) {
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
        sender: fsUser,
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
            profileView === true ? fsUser ?
              <Profile user={fsUser} /> : null : null
          }
          {
            conversationsIndex === true ? fsUser ?
              <Conversations firebase={firebase} convos={convos} fsUser={fsUser} /> : null : null
          }
          {
            matchList === true ?
              <MatchList fsUser={fsUser} matches={matches} createConvo={createConvo} /> : null
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
