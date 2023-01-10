import './matchlist.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function MatchList({ firebase, users, activateConversationWindow }) {
  //conversations need to get created here
  //activateConversationWindow(user) needs to get called
  const auth = firebase.auth();
  const firestore = firebase.firestore()
  
  const { uid, photoURL } = auth.currentUser;


  const conversationsRef = firestore.collection('conversations');
  const convoDocRef = conversationsRef.doc()
  const [convos = []] = useCollectionData(conversationsRef);

  console.log(convos)

    // const sendThatThang = async (e) => {
  //   e.preventDefault();
  //   const msgDocRef = chatRef.doc()
  //   await msgDocRef.set({
  //     body: messageBody,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     author: uid,
  //     users: [uid, userToChatWith.uid],
  //     photoURL,
  //     mid: msgDocRef.id
  //   })
   const createConvo = async (user) => {
    await convoDocRef.set({
      initiator: uid,
      users: [uid, user.uid],
      isPrivate: true
    })
   }
  
  const checkForConvo = (e, user) => {
    //check if conversation already exists, 
    //creates a conversation if not
    e.preventDefault();
    
    convos.map((c) => {
      if (!c.users.includes(uid && user.uid) ){
        createConvo(user)
      } else {
        console.log('convo already exists')
      }
    })

    
    activateConversationWindow(user)
  }

  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        users ?
          users.map(user => {
            return (
              <div key={user.uid} onClick={(e)=>checkForConvo(e, user)} className='match'>
                <p>{user.displayName}</p>
              </div>  
            )
          }) : null
      }
    </div>
  );

}
