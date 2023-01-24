import './chatwindow.css';
import ChatMessage from '../ChatMessage/ChatMessage'
import { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function ChatWindow({ firebase, convoDocId }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;

  const conversationRef = firestore.collection('conversations').doc(convoDocId);

  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt')
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const [messageBody, setMessageBody] = useState('')
  const zoomHandle = useRef()


  function submitHandler(e) {
    e.preventDefault()
    const msgDocRef = conversationRef.collection('messages').doc()
    msgDocRef.set({
      body: messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFrom: uid,
      photoURL,
      mid: msgDocRef.id
    })
    setMessageBody('')
  }
  return (
    <div className="chat-window-container">
      <div>
        <p>blart</p>
        {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} photoURL={photoURL} />)}
        <div ref={zoomHandle}></div>
      </div>
      <form onSubmit={submitHandler}>
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
        <button type="submit">🚀</button>
      </form>

    </div>
  )
}