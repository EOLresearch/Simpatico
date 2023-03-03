import Match from './Match';
import './matchlist.css';
import { useState } from "react";

export default function MatchList({ fsUser, matches, createConvo }) {

  const simpaticoMatches = matches.filter(u => u.uid === fsUser.uid ? null : u)


  //if already matched, this component should know

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
      </div>
      {
        simpaticoMatches.map(user => {
          return (
            <Match key={user.uid} createConvo={createConvo} user={user} />
          )
        })
      }
    </div>
  );
}
