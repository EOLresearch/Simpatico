import { useState } from "react";
import './conversations.css';
import Convo from './Convo'
import ChatWindow from '../ChatWindow/ChatWindow'

export default function Conversations({ firebase, convos, fsUser }) {
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [docID, setDocId] = useState()
  

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;


function chatHandler(e, documentID){
  // console.log(e.target)
  setDocId(documentID)
  setShowChatWindow(true)
}
  return (
    <div className='chatroom'>
      <div className="conversations-container">
        <div className="conversations-inner-container">
          <h3>YOUR CONNECTIONS</h3>
          {
          convos ? 
            convos.map(convo => <Convo key={convo.docId} firebase={firebase} convoDocId={convo.docId} convo={convo} chatHandler={chatHandler} />) 
            : null
          }
        </div>
      </div>
          {
            showChatWindow === true ?
              <ChatWindow firebase={firebase} convoDocId={docID} fsUser={fsUser}/> : <div className="no-convos">No conversation selected</div>
          }
    </div>
  )
}