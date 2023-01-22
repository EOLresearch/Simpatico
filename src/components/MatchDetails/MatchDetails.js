import './matchdetails.css';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { useState } from 'react';

export default function MatchDetails({ userToChatWith, convoHandler, createConvo }) {

  return (
    <div className='match-details-BG'>
      <div className='match-details-container'>
        <h3>{userToChatWith.displayName}</h3>
        <p>This is {userToChatWith.displayName}. {userToChatWith.displayName}, like you, has suffered the loss of thier {userToChatWith.deceased}. This happened on {userToChatWith.lossDate} </p>
        <p>would you like to start a conversation?</p>
        <div className='btn-container'>
          <button onClick={() => createConvo(userToChatWith)}>Yes</button>
          <button onClick={(e) => convoHandler(e, "no user")}>Not yet</button>
        </div>
      </div>
    </div>
  );

}
