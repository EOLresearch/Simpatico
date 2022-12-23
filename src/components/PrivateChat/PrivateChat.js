import './privatechat.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function PrivateChat({ auth, firestore }) {
  // const auth = firebase.auth();

  // const firestore = firebase.firestore()

  const chatRef = firestore.collection('messages');
  const query = chatRef.orderBy('createdAt').limit(25);
  const zoomHandle = useRef()
  const [messages = []] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('')

  const sendThatThang = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await chatRef.add({
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    
    setFormValue('')
    zoomHandle.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='private-chat-container'>
      <div>
        {messages.map(msg => <ChatMessage auth={auth} mid={msg.uid} message={msg} />)}
        <div ref={zoomHandle}></div>
      </div>
      <form onSubmit={sendThatThang}>
        <input value={formValue} onChange={e => setFormValue(e.target.value)} />
        <button type="submit">🚀</button>
      </form>
    </div>
  )
}