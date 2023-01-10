import './conversation.css';

import ChatMessage from '../ChatMessage/ChatMessage'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Conversation({ firebase, fsUser, userToChatWith }) {
  const [messageBody, setMessageBody] = useState('')
  const zoomHandle = useRef()
  
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  
  const { uid, photoURL } = auth.currentUser;





  
  // const conversationsRef = firestore.collection('conversations');


  // const messageRef = chatRef.where("author", "==", uid).where("users", "array-contains", userToChatWith.uid)
  // const [messages = []] = useCollectionData(messageRef);

  // const sendThatThang = async (e) => {
  //   e.preventDefault();
  //   const msgDocRef = chatRef.doc()
  //   await msgDocRef.set({
  //     body: messageBody,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     author: uid,
  //     users: [uid, userToChatWith.uid],
  //     photoURL,
  //     mid: msgDocRef.id
  //   })

  //   setMessageBody('')
  //   zoomHandle.current.scrollIntoView({ behavior: 'smooth' })
  // }


  //user creates a conversation with a user from the match list
  //conversation holds all relational data for messages
  //conversation has a subcollection of messages between the users
  //only those users can see that conversation/messages
  //the idea is to simplify the queries

  //privateConversation? publicConversation?

  return (
    <div className='conversation-container'>
      <div>
        <p>{userToChatWith.displayName}</p>
        {/* {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} />)} */}
        <div ref={zoomHandle}></div>
      </div>
      <form >
        <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
        <button type="submit">🚀</button>
      </form>
    </div>
  )
}