// import { useState } from "react";
import './conversations.css';
import Convo from './Convo'
import ChatWindow from './ChatWindow/ChatWindow'
import { useEffect, useState } from 'react';

export default function Conversations({ chatHandler, docID, showChatWindow, firebase, convos, fsUser }) {

  const [selectedConvo, setSelectedConvo] = useState(null)

  useEffect(() => {
    if (convos) {
      const convo = convos.find(c => c.docID === docID)
      setSelectedConvo(convo)
    }
  }, [convos, docID])




  return (
    <div className='chatroom'>
      <div className="conversations-container">
        <div className="conversations-inner-container">
          <h3>YOUR CONNECTIONS</h3>
          {
          convos ? 
            convos.map(convo => <Convo key={convo.docID} firebase={firebase} selectedDocID={docID} convo={convo} chatHandler={chatHandler} />) 
            : null
          }
        </div>
      </div>
          {
            showChatWindow === true ?
              <ChatWindow firebase={firebase} convoDocId={docID} convo={selectedConvo} fsUser={fsUser}/> : <div className="no-convos"><p>NO CONVERSATION SELECTED</p></div>
          }
    </div>
  )
}