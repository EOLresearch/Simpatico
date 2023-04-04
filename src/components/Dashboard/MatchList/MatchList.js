import Match from './Match';
import './matchlist.css';
import { useState, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function MatchList({ fsUser, matches, createConvo, convos, convoMutualConsent }) {
  // matches need to know if they have a convo already and if it has mutualConsent ticked

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
      </div>
      <div className='match-list'>
        {
          matches.map((match, index) => {
            const convo = convos.find(c => c.docID === `${fsUser.uid} + ${match.uid}` || c.docID === `${match.uid} + ${fsUser.uid}`)
            return (
              <Match
                key={index}
                user={match}
                createConvo={createConvo}
                convo={convo}
                convoMutualConsent={convoMutualConsent}
              />
            )
          })
        }
      </div>
    </div>
  );
}
