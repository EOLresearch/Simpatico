import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Convo({ firebase, convoDocId, convo }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;

  const theOtherPerson = uid === convo.userData.sender.uid ? convo.userData.receiver : convo.userData.sender
  return (
    <div className='convo-container'>
      <div data-identifier="openChat" className='convo' >
        <img src={theOtherPerson.photoURL} ></img>
        <h4 data-identifier="openChat">{theOtherPerson.displayName}</h4>
      </div>
    </div>
  )
}