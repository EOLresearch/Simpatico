import './matchdetails.css';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { useState } from 'react';

export default function MatchDetails({ userToChatWith, convoHandler, createConvo }) {

  return (
    <div className='match-details-container'>
      <h3>{userToChatWith.displayName}</h3>
      <p>would you like to start a conversation?</p>
      <button onClick={()=>createConvo(userToChatWith)}>create convo</button>
      <button onClick={(e)=>convoHandler(e, "no user")}>no</button>

    </div>
  );

}
