import React, { useRef, useEffect } from 'react';
import './chatwindow.css';
import ChatMessage from '../../ChatMessage/ChatMessage';
import ConvoInvite from '../../ConvoInvite/ConvoInvite';
import ChatInput from './ChatInput'; // Import the ChatInput component
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, firebase } from '../../../../firebase-config';

export default function ChatWindow({ convoDocId, convo, fsUser, convoMutualConsentToggle }) {
  const conversationRef = firestore.collection('conversations').doc(convoDocId);
  const messagesColOrderedRef = conversationRef.collection('messages').orderBy('createdAt').limitToLast(15);
  const [messages = []] = useCollectionData(messagesColOrderedRef);

  const scrollHandle = useRef();

  useEffect(() => {
    scrollHandle.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderNoConvoMessage = () => (
    <div className="chat-window-container">
      <div className="scrollref" ref={scrollHandle}></div>
    </div>
  );

  
  const renderSentRequestMessage = () => (
    <div className="chat-window-container">
      <p className="sent-request">
        You have sent a chat request to {convo.userData.receiver.displayName} <br /> <br />
        You will see your message appear here when they have responded to your request.
      </p>
      <div className="scrollref" ref={scrollHandle}></div>
    </div>
  );

  const renderConvoInvite = () => (
    <div className="chat-window-container">
      <ConvoInvite convo={convo} convoMutualConsentToggle={convoMutualConsentToggle} />
      <div className="scrollref" ref={scrollHandle}></div>
    </div>
  );

  const handleSubmitMessage = (message) => {
    if (message.trim() === '') return;
    const msgDocRef = conversationRef.collection('messages').doc();
    msgDocRef.set({
      mid: msgDocRef.id,
      body: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentFromUid: fsUser.uid,
      sentFromDisplayName: fsUser.displayName,
      photoURL: fsUser.photoURL,
    });
  };

  if (!convo) {
    return renderNoConvoMessage();
  }

  if (convo.mutualConsent === false && convo.userData.sender.uid === fsUser.uid) {
    return renderSentRequestMessage();
  }

  if (convo.mutualConsent === false && convo.userData.receiver.uid === fsUser.uid) {
    return renderConvoInvite();
  }

  return (
    <div className="chat-window-container">
      <div className="message-container">
        {messages.map((msg) => (
          <ChatMessage key={msg.mid} auth={auth} mid={msg.mid} message={msg} />
        ))}
        <div className="scrollref" ref={scrollHandle}></div>
      </div>
      <ChatInput onSubmit={handleSubmitMessage} />
    </div>
  );
}
