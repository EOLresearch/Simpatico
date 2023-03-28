import Match from './Match';
import './matchlist.css';
import { useState } from "react";

export default function MatchList({ fsUser, matches, createConvo, convos }) {

  const simpaticoMatches = matches.filter(u => u.uid === fsUser.uid ? null : u)

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
      </div>
      {
        simpaticoMatches.map(user => {
          if (convos.length === 0) {
            return <Match key={user.uid} createConvo={createConvo} user={user} />
          }
          return convos.map(convo => {
            if (convo.users.includes(user.uid)) {
              return <Match key={user.uid} createConvo={createConvo} user={user} convo={convo} />
            } else {
              return <Match key={user.uid} createConvo={createConvo} user={user} />
            }
          })
        })
      }
    </div>
  );
}
