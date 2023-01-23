import { useState } from "react";
import './conversations.css';
import Convo from './Convo'


export default function Conversations({ firebase, convos = []}) {
  //THis may be the only component that needs to know WHO to chat with
  //THis may also be the only component that needs to know WHICH convo we are in. 
  const [chatView, setChatView] = useState(false)



  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;



  //trying to figure out how to only query conversations which are active. how to know which are active without querying them?
  //maybe record all user uids of all users a user has ever had a conversation with on the user record, just an array of UIDS, and then we an querry any documents with the doc id combinations of UIDS we already have in that case?

  return (
    <div className='conversations-container'>
      <h2>conversations</h2>
        {convos.map(convo => {
          return <div key={convo.docId}>{convo.docId}</div>
        })}
    </div>
  )
}