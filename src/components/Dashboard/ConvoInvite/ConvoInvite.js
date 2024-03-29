import './convoInvite.css';
import { useState } from "react";
import { convoMutualConsentToggle } from '../../../helpers/firebasehelpers';

export default function ConvoInvite({ fsUser, convo, createConvo }) {


  return (
    <div className="convo-invitation">
      <div className="convo-invitation-container">
        <div className="convo-invitation-header">
          <h4>Invitation to chat</h4>

        </div>
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
