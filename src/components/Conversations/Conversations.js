import { useState } from "react";
import './conversations.css';
import Convo from './Convo'


export default function Conversations({ firebase, convos, navHandler }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;



  return (
    <div className='conversations-container'>
      <h2>conversations</h2>
      {convos ? convos.map(convo => <Convo firebase={firebase} convoDocId={convo.docId} convo={convo} navHandler={navHandler} />) : null}
    </div>
  )
}