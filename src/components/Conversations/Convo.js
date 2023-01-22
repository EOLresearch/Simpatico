import './convo.css';

import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Convo({ firebase, userToChatWith, convoDocId }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const conversationRef = firestore.collection('conversations').doc(convoDocId);
  const { uid, photoURL } = auth.currentUser;
  const zoomHandle = useRef()
  const [messageBody, setMessageBody] = useState('')

  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt')
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const messagesColRef = conversationRef.collection('messages')
  function submitHandler(e) {
    e.preventDefault()
    const msgDocRef = messagesColRef.doc()
    msgDocRef.set({
      body: messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFrom: uid,
      photoURL,
      mid:msgDocRef.id
    })
    setMessageBody('')
  }

  return (
    <div className='convo-container'>
      <div>
        <p>{userToChatWith.displayName}</p>
        {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} />)}
        <div ref={zoomHandle}></div>
      </div>
      <form onSubmit={submitHandler}>
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
        <button type="submit">🚀</button>
      </form>
    </div>
  )
}