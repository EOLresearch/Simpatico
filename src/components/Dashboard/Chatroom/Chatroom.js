import React, { useState } from 'react';
import './chatroom.css';
import ContactsList from './ContactsList';
import PromptsList from './PromptsList';
import ConversationsList from './ConversationsList';
import MatchCard from './MatchCard';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';


function Chatroom({ fsUser, match}) {
  const [leftExpanded, setLeftExpanded] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);
  const [activeLeftList, setActiveLeftList] = useState('contacts');
  const [activeRightList, setActiveRightList] = useState('match');
  const [message, setMessage] = useState("");

  const renderLeftList = () => {
    if (activeLeftList === 'contacts') return <ContactsList contact={match}/>;
    if (activeLeftList === 'conversations') return <ConversationsList contact={match}/>;
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
            <button className={`${activeLeftList === 'contacts' ? 'activated-left' : ''}`} onClick={() => setActiveLeftList('contacts')}>Contacts</button>
            <button className={`${activeLeftList === 'conversations' ? 'activated-left' : ''}`} onClick={() => setActiveLeftList('conversations')}>Conversations</button>
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
          {rightExpanded ? <RxCaretRight /> : <RxCaretLeft />}
        </button>

          {rightExpanded && (
            <div className='slider-btns'>
              <button className={`${activeRightList === 'match' ? 'activated-right' : ''}`}  onClick={() => setActiveRightList('match')}>Match</button>
              <button className={`${activeRightList === 'prompts' ? 'activated-right' : ''}`}  onClick={() => setActiveRightList('prompts')}>Prompts</button>
            </div>
          )}
        
        {rightExpanded && (renderRightList())}
      </div>
    </div>
    </IconContext.Provider>
  );
}

export default Chatroom;
