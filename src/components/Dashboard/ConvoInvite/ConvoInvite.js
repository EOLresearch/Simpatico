import './convoInvite.css';
import { useState } from "react";

export default function ConvoInvite({ fsUser, convo, convoMutualConsentToggle, createConvo }) {


  return (


    <div className="convo-invitation">
      <div className="convo-invitation-container">
        <h4>Invitation to chat</h4>
        <div className='convo-invitation-body'>
          <p>{convo.userData.sender.displayName} has sent you a message</p>
          <p><em>"{convo.firstMessage}"</em></p>
          <p>Would you like to accept this invitation to chat? </p>
          <div className='convo-invitation-buttons'>
            <button onClick={() => convoMutualConsentToggle(convo.docID, true)} className="accept-btn">Accept</button>
            <button onClick={() => convoMutualConsentToggle(convo.docID, false)} className="decline-btn">Decline</button>
          </div>
        </div>
      </div>
    </div>

  )
}
