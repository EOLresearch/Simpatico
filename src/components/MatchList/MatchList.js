import './matchlist.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';



export default function MatchList({ firebase, users, activateConversationWindow }) {

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const { uid, photoURL } = auth.currentUser;
  const [docId, setDocId] = useState()

  const conversationsRef = firestore.collection('conversations');
  // const [convos = []] = useCollectionData(conversationsRef)
  // console.log(convos)

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
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    b.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setDocId(docId2)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    //this feels repetative and wasteful so i think there is a better way, I am tired. 

    //NEED TO DETERMINE DOCID HERE AS A WAY OF ENSURING CONVERSATIONS ARE UNIQUE AND NOT DUPLICATED
    //maybe i can embed the docid on the conversation document itself, and then check for both variations with the convos array alrady here

  }

  const createConvo = async (e, user) => {
    e.preventDefault();

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
