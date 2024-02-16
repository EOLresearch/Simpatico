import React from 'react';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';


function ConversationsList({ conversations }) {

  console.log(conversations)
  if (!conversations || !conversations.length) {
    return <div>No conversations available</div>;
  }
  return (
    <IconContext.Provider value={{ className: "react-icons-contacts" }}>
      <div className="flex-list">

          {conversations.map((conversation, index) => (
            <div key={index} className="chatroom-item">
              <p>{conversation.name}</p>
            </div>
          ))}

      </div>
    </IconContext.Provider>
  );
}

export default ConversationsList;
