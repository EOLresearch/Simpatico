import './dashboard.css';
import Conversation from './Conversation/Conversation'
import Nav from './Nav/Nav'
import MatchList from './MatchList/MatchList'
import MatchDetails from './MatchDetails/MatchDetails'
//TODO: component import-index refactor

import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import multiavatar from '@multiavatar/multiavatar/esm'

import { IconContext } from "react-icons";
import { FaBookOpen, FaList, FaArrowLeft } from 'react-icons/fa';
import { IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

export default function Dashboard({ auth, firebase }) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [showMatchList, setShowMatchList] = useState(false)
  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [showConversationWindow, setShowConversationWindow] = useState(false)

  const [userToChatWith, setUserToChatWith] = useState()
  const [convoDocId, setConvoDocId] = useState()

  const { uid, email, photoURL } = auth.currentUser;
  console.log(auth.currentUser)
  const firestore = firebase.firestore();

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);
  //TODO:Right now, this is ALL USERS that gets sent to the matchlist, we will need to be able to filter this by profile data when the time is right. 

  const userQuery = usersRef.where("email", "==", email)
  const [fsUser] = useCollectionData(userQuery);

  const conversationsRef = firestore.collection('conversations');

  function convoHandler(e, user) {
    e.preventDefault();
    setConvoDocId('')
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
        setConvoDocId(docId1)
        setShowConversationWindow(true)
      } else {
        console.log('else, now run b')
        b.get().then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setConvoDocId(docId2)
            setShowConversationWindow(true)
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
      isPrivate: true,
      docId: docId
    })
    setConvoDocId(docId)
    setShowConversationWindow(true)
    setShowMatchDetails(false)
  }

  //when the time comes for randomized avatars for users this package which is already installted via npm should work
  //https://github.com/multiavatar/Multiavatar
  // let svgCode = multiavatar('Binx Bond')
  // console.log(svgCode)

  //TODO: nav is not responsive, need a hamburger menu to crash into

  function navHandler(e) {
    // setShowConversationWindow
    // setShowMatchDetails
    // setShowMatchList
    // setShowWelcomeMessage
    console.log(e.target)
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
        }
        {
          showMatchList === true ?
            <MatchList currentUid={uid} users={users} convoHandler={convoHandler} /> : null
        }
        {
          // this WILL need to change to an index of all users conversations (which should be easy enough to query)
          // setShowConversationsIndex

          showConversationWindow === true ?
            <Conversation firebase={firebase} userToChatWith={userToChatWith} convoDocId={convoDocId} /> : null
        }
        {
          showMatchDetails === true ?
            <MatchDetails userToChatWith={userToChatWith} createConvo={createConvo} /> : null
        }
      </div>
    </div>
  );

}

function WelcomeMessage() {

  return (
    <IconContext.Provider value={{ className: "react-icons-welcome" }}>
      <div className='welcome'>
        <div className='hero-image'> this is a pretty image that grabs peoples eyes and directs them downward</div>
        <div className='welcome-body'>
          <h1>Simpatico</h1>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>

          <h3>Home Page Welcome Message</h3>
          <p>perhaps with instructions or descriptions?</p>
          <div className='callouts'>
            <div>callout to center site?</div>
            <div>callout to weillcornell proper?</div>
            <div>callout to another resource?</div>

          </div>
          {/* <ul>
            <li><IoChatbubblesSharp />Conversations</li>
            <li><IoPeopleCircleOutline />Matches</li>
            <li><FaList />My Details</li>
            <li><FaBookOpen />My Story</li>
          </ul> */}
        </div>
      </div>
    </IconContext.Provider>
  )
}