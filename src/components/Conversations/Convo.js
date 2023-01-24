import './convo.css';

import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Convo({ firebase, convoDocId }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;
  const zoomHandle = useRef()

  const conversationRef = firestore.collection('conversations').doc(convoDocId);
  const [thisConversation] = useDocumentData(conversationRef);


  //this is probably all going to get another component for the actual chat window. and then ill need to go back through and rename some shit becasue there are lots of convos now. 


  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt')
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const [messageBody, setMessageBody] = useState('')


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