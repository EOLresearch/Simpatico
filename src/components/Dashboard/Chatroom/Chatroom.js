import React, { useState } from 'react';
import './chatroom.css';
import ContactsList from './ContactsList';
import PromptsList from './PromptsList';
import ConversationsList from './ConversationsList';
import MatchCard from './MatchCard';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';


function Chatroom() {
  const [leftExpanded, setLeftExpanded] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);
  const [activeLeftList, setActiveLeftList] = useState('contacts');
  const [activeRightList, setActiveRightList] = useState('match');
  const [message, setMessage] = useState("");

  const renderLeftList = () => {
    if (activeLeftList === 'contacts') return <ContactsList />;
    if (activeLeftList === 'conversations') return <ConversationsList />;
    return null;
  };

  const renderRightList = () => {
    if (activeRightList === 'prompts') return <PromptsList />; //turn this into prompts
    if (activeRightList === 'match') return <MatchCard />;
    return null;
  };

  const handleSendMessage = () => {
    console.log("Sending message: ", message);
    setMessage(""); // Clear the input
  };

  return (
    <IconContext.Provider value={{ className: "react-icons-chatroom" }}>
    <div className="chatroom">
      <div className={`left-panel ${leftExpanded ? 'expanded' : ''}`}>
        <button className="toggle-btn" onClick={() => setLeftExpanded(!leftExpanded)}>
          {leftExpanded ? <RxCaretLeft /> : <RxCaretRight />}
        </button>
        {leftExpanded && (
          <div className='slider-btns'>
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
        <button className="toggle-btn" onClick={() => setRightExpanded(!rightExpanded)}>
          {rightExpanded ? <RxCaretLeft /> : <RxCaretRight />}
        </button>

          {rightExpanded && (
            <div className='slider-btns'>
              <button onClick={() => setActiveRightList('prompts')}>Prompts</button>
              <button onClick={() => setActiveRightList('match')}>Match</button>
            </div>
          )}
        
        {rightExpanded && (renderRightList())}
      </div>
    </div>
    </IconContext.Provider>
  );
}

export default Chatroom;
