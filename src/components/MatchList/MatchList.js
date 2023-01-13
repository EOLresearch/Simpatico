import './matchlist.css';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { useState } from 'react';

export default function MatchList({ currentUid, users = [], convoHandler }) {

  // const auth = firebase.auth();
  // const firestore = firebase.firestore()
  // const { uid } = auth.currentUser;
  // const matchStyle = message.sentFrom === auth.currentUser.uid ? 'sent' : 'received'

  const matches = users.filter(u => u.uid === currentUid ? null : u)

  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        matches.map(user => {
          return (
            <div key={user.uid} onClick={(e) => convoHandler(e, user)} className='match'>
              <p>{user.displayName}<br />{user.email}</p>
            </div>
          )
        })
      }
    </div>
  );

}
