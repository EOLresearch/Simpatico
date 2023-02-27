import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Convo({ firebase, convoDocId, convo, chatHandler }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;

  const theOtherPerson = uid === convo.userData.sender.uid ? convo.userData.receiver : convo.userData.sender

  // console.log(theOtherPerson[0])
  return (
    <div className='convo-container' onClick={e=>chatHandler(e, convoDocId)}>
      <div className='convo' >
        <img src={theOtherPerson[0].photoURL} ></img>
        <p data-identifier="openChat">{theOtherPerson[0].displayName}</p>
      </div>
    </div>
  )
}