import React, { useState } from 'react';
import './chatroom.css';
import ContactsList from './ContactsList';
import DiscussionsList from './DiscussionsList';
import ConversationsList from './ConversationsList';

function Chatroom() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const [message, setMessage] = useState("");

  const renderList = () => {
    if (activeList === 'contacts') return <ContactsList />;
    if (activeList === 'discussions') return <DiscussionsList />;
    if (activeList === 'conversations') return <ConversationsList />;
    return null;
  };

  const handleSendMessage = () => {
    console.log("Sending message: ", message);

    setMessage(""); // Clear the input
  };

  return (
    <div className="chatroom">
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
      <div className={`right-third ${isExpanded ? 'expanded' : ''}`}>
        <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '-' : '+'}
        </button>
        {isExpanded && (
          <div>
            <button className="toggle-btn" onClick={() => setActiveList('contacts')}>Contacts</button>
            <button className="toggle-btn" onClick={() => setActiveList('discussions')}>Discussions</button>
            <button className="toggle-btn" onClick={() => setActiveList('conversations')}>Conversations</button>
          </div>
        )}
        {isExpanded && renderList()}
      </div>
    </div>
  );
  
}

export default Chatroom;
