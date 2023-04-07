import './chatwindow.css';
import ChatMessage from '../../ChatMessage/ChatMessage'
import ConvoInvite from '../../ConvoInvite/ConvoInvite'
import { useRef, useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function ChatWindow({ firebase, convoDocId, convo, fsUser, convoMutualConsentToggle }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()

  const conversationRef = firestore.collection('conversations').doc(convoDocId);

  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt').limitToLast(25)
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const [messageBody, setMessageBody] = useState('')
  const scrollHandle = useRef()

  useEffect(() => {
    scrollHandle.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  function submitHandler(e) {
    e.preventDefault()
    if (messageBody === '') return
    const msgDocRef = conversationRef.collection('messages').doc()
    msgDocRef.set({
      mid: msgDocRef.id,
      body: messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFromUid: fsUser.uid,
      sentFromDisplayName: fsUser.displayName,
      photoURL: fsUser.photoURL
    })
    setMessageBody('')
  }


  if (!convo) {
    return (
      <div className="chat-window-container">
        <div className='scrollref' ref={scrollHandle}></div>
      </div>
    )
  }


  if (convo.mutualConsent === false && convo.userData.sender.uid === fsUser.uid) {
    return (
      <div className="chat-window-container">
        <p className='sent-request'>
          You have sent a chat request to {convo.userData.receiver.displayName} <br />  <br/>
          You will see your message appear here when they have responded to your request.
        </p>
        <div className='scrollref' ref={scrollHandle}></div>
      </div>
    )
  }

  if (convo.mutualConsent === false && convo.userData.receiver.uid === fsUser.uid) {
    return (
      <div className="chat-window-container">
          <ConvoInvite convo={convo} convoMutualConsentToggle={convoMutualConsentToggle}/>
        <div className='scrollref' ref={scrollHandle}></div>
      </div>
    )
  }

  if (convo.mutualConsent === true) {
    return (
      <div className="chat-window-container">
        <div className='message-container'>
          {messages.map(msg => <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} />)}
          <div className='scrollref' ref={scrollHandle}></div>
        </div>
        <form onSubmit={submitHandler}>
          <input value={messageBody} onChange={e => setMessageBody(e.target.value)} />
          <button type="submit"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    )
  }

}