import { useState } from "react";
import './conversations.css';
import Convo from './Convo'
import ChatWindow from '../ChatWindow/ChatWindow'

export default function Conversations({ chatHandler, docID, showChatWindow, firebase, convos, fsUser }) {


  return (
    <div className='chatroom'>
      <div className="conversations-container">
        <div className="conversations-inner-container">
          <h3>YOUR CONNECTIONS</h3>
          {
          convos ? 
            convos.map(convo => <Convo key={convo.docID} firebase={firebase} convoDocId={convo.docID} convo={convo} chatHandler={chatHandler} />) 
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