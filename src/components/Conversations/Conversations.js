import { useState } from "react";
import './conversations.css';
import Convo from './Convo'
import ChatWindow from '../ChatWindow/ChatWindow'

export default function Conversations({ firebase, convos, navHandler }) {
  const [showChatWindow, setShowChatWindow] = useState(false)

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;



  return (
    <div className='conversations-wrapper'>
      <div className="conversations-container">
        <div className="conversations-inner-container">
          {/* <h2>conversations</h2> */}
          {convos ? convos.map(convo => <Convo firebase={firebase} convoDocId={convo.docId} convo={convo} navHandler={navHandler} />) : null}

        </div>
      </div>
    </div>
  )
}