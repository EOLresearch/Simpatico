import './matchlist.css';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { useState } from 'react';

export default function MatchList({ firebase, users, convoHandler }) {

  // const auth = firebase.auth();
  // const firestore = firebase.firestore()
  // const { uid } = auth.currentUser;


  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        users ?
          users.map(user => {
            return (
              <div key={user.uid} onClick={(e) => convoHandler(e, user)} className='match'>
                <p>{user.displayName}</p>
              </div>
            )
          }) : null
      }
    </div>
  );

}
