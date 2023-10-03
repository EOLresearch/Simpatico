import React, { useEffect, useState } from 'react';
import './conversations.css';
import Convo from './Convo';
import ChatWindow from './ChatWindow/ChatWindow';

export default function Conversations({
  chatHandler,
  docID,
  showChatWindow,
  convos,
  fsUser,
  convoMutualConsentToggle,
}) {
  const [selectedConvo, setSelectedConvo] = useState(null);

  useEffect(() => {
    const convo = convos.find((c) => c.docID === docID);
    setSelectedConvo(convo);
  }, [convos, docID]);

  const renderConvos = () => {
    if (!convos || convos.length === 0) {
      return <div className="no-convos"><p>NO CONVERSATIONS</p></div>;
    }

    return convos.map((convo) => (
      <Convo key={convo.docID} selectedDocID={docID} convo={convo} chatHandler={chatHandler} />
    ));
  };

  return (
    <div className="chatroom">
      <div className="conversations-container">
        <div className="conversations-inner-container">
          <h3>YOUR CONNECTIONS</h3>
          {renderConvos()}
        </div>
      </div>
      {showChatWindow ? (
        <ChatWindow convoDocId={docID} convo={selectedConvo} fsUser={fsUser} convoMutualConsentToggle={convoMutualConsentToggle} />
      ) : (
        <div className="no-convos">
          <p>NO CONVERSATION SELECTED</p>
        </div>
      )}
    </div>
  );
}
