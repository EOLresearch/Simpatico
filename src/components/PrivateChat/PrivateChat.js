import './privatechat.css';

import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function PrivateChat({ firebase, fsUser, userToChatWith }) {
  const zoomHandle = useRef()
  
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const chatRef = firestore.collection('messages');

  const { uid, photoURL } = auth.currentUser;
  // const messagesQuery = chatRef.orderBy('createdAt').limit(25);
  const messagesQuery = chatRef.where("fromUid", "==", uid).where("toUid", "==", userToChatWith.uid)


  const [messages = []] = useCollectionData(messagesQuery, { idField: 'id' });
  const [messageBody, setMessageBody] = useState('')

  const sendThatThang = async (e) => {
    e.preventDefault();
    const msgDocRef = chatRef.doc()
    await msgDocRef.set({
      body: messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      fromUid: uid,
      toUid: userToChatWith.uid,
      photoURL,
      mid: msgDocRef.id
    })

    setMessageBody('')
    zoomHandle.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='private-chat-container'>
      <div>
        <p>{userToChatWith.displayName}</p>
        {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} />)}
        <div ref={zoomHandle}></div>
      </div>
      <form onSubmit={sendThatThang}>
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
        <button type="submit">🚀</button>
      </form>
    </div>
  )
}