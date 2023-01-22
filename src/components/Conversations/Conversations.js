import './conversation.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

export default function Conversations({ firebase, convos = []}) {
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;


  //we need to know who send it and who received it, and that might be easier to do by just adding those fields directly instead of the naming order. 
  //right now, first user is always sender, but thats not obvious and therefore easy to forget. 
  //want to get for consent, if not, ask for it, and then set the conversation to mutualCOnsent = true and isActive = True
  //trying to figure out how to only queery conversations which are active. how to know which are active without querying them?
  //maybe record all user uids of all users a user has ever had a conversation with on the user record, just an array of UIDS, and then we an querry any documents with the doc id combinations of UIDS we already have in that case?

  return (
    <div className='conversations-container'>
      <h2>conversations</h2>
        {convos.map(convo => {
          if (convo.mutualConsent === false){
            console.log('no consent')
          }
          console.log(convo)
        })}
    </div>
  )
}