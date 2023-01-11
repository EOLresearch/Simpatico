import './matchlist.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function MatchList({ firebase, users, activateConversationWindow }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;
  const conversationsRef = firestore.collection('conversations');

  
  const createConvo = async (e, user) => {
    e.preventDefault();
    const docId = `${uid} + ${user.uid}`
    await conversationsRef.doc(docId).set({
      users: [uid, user.uid],
      isPrivate: true
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
              <div key={user.uid} onClick={(e) => createConvo(e, user)} className='match'>
                <p>{user.displayName}</p>
              </div>
            )
          }) : null
      }
    </div>
  );

}
