import Match from './Match';
import './matchlist.css';
import { useState, useEffect } from "react";

export default function MatchList({ fsUser, matches, createConvo, convos }) {
  

  const simpaticoMatches = matches.filter(u => u.uid === fsUser.uid ? null : u)

  // matches with convos with mutual consent do not even need to show up here
  // matches with convos without mutual consent should trigger a notification in the dashboard


  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
      </div>
      <div className='match-list'>
        {
          simpaticoMatches.map(match => <Match key={match.uid} user={match} createConvo={createConvo} convos={convos} />)
        }
      </div>
    </div>
  );
}
