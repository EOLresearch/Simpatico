import { useState } from "react";
import './conversations.css';
import Convo from './Convo'
import ChatWindow from '../ChatWindow/ChatWindow'
import { doc } from "firebase/firestore";

export default function Conversations({ firebase, convos, navHandler }) {
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [docID, setDocId] = useState()
  

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;


function chatHandler(e, documentID){
  console.log(e.target)
  setDocId(documentID)
  setShowChatWindow(true)
}


  return (
    <div className='conversations-wrapper'>
      <div className="conversations-container">
        <div className="conversations-inner-container">
          {/* <h2>conversations</h2> */}
          {convos ? convos.map(convo => <Convo key={convo.docId} firebase={firebase} convoDocId={convo.docId} convo={convo} chatHandler={chatHandler} />) : null}

        </div>
      </div>
          {
            showChatWindow === true ?
              <ChatWindow firebase={firebase} convoDocId={docID} /> : null
          }
    </div>
  )
}