import './chatwindow.css';
import ChatMessage from '../ChatMessage/ChatMessage'
import { useRef, useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function ChatWindow({ firebase, convoDocId, fsUser }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;

  const conversationRef = firestore.collection('conversations').doc(convoDocId);

  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt').limitToLast(25)
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const [messageBody, setMessageBody] = useState('')
  const scrollHandle = useRef()
  
  useEffect(()=>{
    scrollHandle.current.scrollIntoView({ behavior: 'smooth' });
  },[messages])

  function submitHandler(e) {
    e.preventDefault()
    const msgDocRef = conversationRef.collection('messages').doc()
    msgDocRef.set({
      mid: msgDocRef.id,
      body: messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFromUid: uid,
      sentFromDisplayName: fsUser.displayName,
      photoURL,
    })
    setMessageBody('')
  }
  return (
    <div className="chat-window-container">
      <div className='message-container'>
        {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} photoURL={photoURL} />)}
        <div className='scrollref' ref={scrollHandle}></div>
      </div>
      <form onSubmit={submitHandler}>
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}