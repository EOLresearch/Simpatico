import React from 'react';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';


function ConversationsList({  }) {
  return (
    <IconContext.Provider value={{ className: "react-icons-contacts" }}>
      <div className="conversations-list">
        <div className="contacts-list">
          
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default ConversationsList;
