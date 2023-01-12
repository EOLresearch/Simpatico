import './matchlist.css';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

export default function MatchList({ firebase, users, activateConversationWindow }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid } = auth.currentUser;
  const [docId, setDocId] = useState()

  const conversationsRef = firestore.collection('conversations');

//TODO:: REFACTOR THIS FUNCTION after MVP maybe even everything into the parent component to keep this one basic
  function convoHandler(e, user) {
    e.preventDefault();
    const docId1 = `${uid} + ${user.uid}`
    const docId2 = `${user.uid} + ${uid}`

    const a = conversationsRef.doc(docId1)
    const b = conversationsRef.doc(docId2)

    a.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setDocId(docId1)
      } else {
        confirmCreateConversation(user)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    b.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setDocId(docId2)
      } else {
        confirmCreateConversation(user)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function confirmCreateConversation(user){
    //modal - this person's details with a button that says "Start a conversation?"
    console.log("this function is running twice? is this from strictmode?")
    

  }

  async function createConvo(user){
    const docId = `${uid} + ${user.uid}`
    await conversationsRef.doc(docId).set({
      users: [uid, user.uid],
      isPrivate: true,
      docId: docId
    })
    activateConversationWindow(user, docId)
  }

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
