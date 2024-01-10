import React, { useState } from 'react';
import './chatroom.css';
import ContactsList from './ContactsList';
import DiscussionsList from './DiscussionsList';
import ConversationsList from './ConversationsList';

function Chatroom() {
  const [leftExpanded, setLeftExpanded] = useState(true);
  const [rightExpanded, setRightExpanded] = useState(true);
  const [activeLeftList, setActiveLeftList] = useState(null);
  const [activeRightList, setActiveRightList] = useState('discussions');
  const [message, setMessage] = useState("");

  const renderLeftList = () => {
    if (activeLeftList === 'contacts') return <ContactsList />;
    if (activeLeftList === 'conversations') return <ConversationsList />;
    return null;
  };

  const renderRightList = () => {
    if (activeRightList === 'discussions') return <DiscussionsList />;
    return null;
  };

  const handleSendMessage = () => {
    console.log("Sending message: ", message);
    setMessage(""); // Clear the input
  };

  return (
    <div className="chatroom">
      <div className={`left-panel ${leftExpanded ? 'expanded' : ''}`}>
        {/* <button className="toggle-btn" onClick={() => setLeftExpanded(!leftExpanded)}>
          {leftExpanded ? '-' : '+'}
        </button> */}
        {leftExpanded && (
          <div>
            <button onClick={() => setActiveLeftList('contacts')}>Contacts</button>
            <button onClick={() => setActiveLeftList('conversations')}>Conversations</button>
          </div>
        )}
        {leftExpanded && renderLeftList()}
      </div>
      <div className="message-window">
        <div className="message-content">
          {/* Your message content here */}
        </div>
        <div className="message-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className={`right-panel ${rightExpanded ? 'expanded' : ''}`}>
        {/* <button className="toggle-btn" onClick={() => setRightExpanded(!rightExpanded)}>
          {rightExpanded ? '-' : '+'}
        </button> */}
        {rightExpanded && renderRightList()}
      </div>
    </div>
  );
}

export default Chatroom;
