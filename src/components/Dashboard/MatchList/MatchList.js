import Match from './Match';
import './matchlist.css';
import { useState } from "react";

export default function MatchList({ fsUser, matches, createConvo }) {
  const [message, setMessage] = useState('')


  function supportiveMessage() {
    //to pass down to the match component
    //create some state for a message
    //call createConvo
    //and then run below code

    // const msgDocRef = conversationRef.collection('messages').doc()
    // msgDocRef.set({
    //   mid: msgDocRef.id,
    //   body: message,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   sentFromUid: uid,
    //   sentFromDisplayName: fsUser.displayName,
    //   photoURL,
    // })
    // setMessage('')
  }
  

  const simpaticoMatches = matches.filter(u => u.uid === fsUser.uid ? null : u)

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
