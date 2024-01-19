import React from 'react';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';


function ConversationsList({ contact }) {
  return (
    <IconContext.Provider value={{ className: "react-icons-contacts" }}>
      <div className="conversations-list">
        <div className="contacts-list">
          {/* <h3>Contacts List</h3> */}
          <div className="contact" >
            <div className="contact-body">
              <h5>Brian Crenshaw - Match</h5>
              <div className='convo-starter'>
                <h6>You have 2 unread messages</h6>
                <RxCaretRight />
              </div>
            </div>
          </div>
          <div className="contact" >
            <div className="contact-body">
              <h5>Technical support questions with Joe Miller</h5>
              <div className='convo-starter'>
                <h6>You are up to date</h6>
                <RxCaretRight />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default ConversationsList;
