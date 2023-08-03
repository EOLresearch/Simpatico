// firebaseHelpers.js
import { firestore } from './firebase-config'; // Assuming you've a separate config file for firebase

export function createConvo(uid, fsUser, e, message, user, navHandler, setShowChatWindow) {
  e.preventDefault()

  const documentID = `${uid} + ${user.uid}`
  const conversationsRef = firestore.collection('conversations');
  const conversationRef = conversationsRef.doc(documentID);

  const newConvo = {
    users: [uid, user.uid],
    userData: {
      sender: fsUser,
      receiver: user,
    },
    createdAt: firestore.FieldValue.serverTimestamp(),
    docID: documentID,
    mutualConsent: false,
    firstMessage: message,
  }
  conversationRef.set(newConvo)

  const msgDocRef = conversationRef.collection('messages').doc()
  msgDocRef.set({
    mid: msgDocRef.id,
    body: message,
    createdAt: firestore.FieldValue.serverTimestamp(),
    sentFromUid: uid,
    sentFromDisplayName: fsUser.displayName,
    photoURL: fsUser.photoURL,
  })

  navHandler("Conversations")
  setShowChatWindow(true)
}

export function convoMutualConsentToggle(docID, boolean, setShowChatWindow, navHandler) {
  const conversationsRef = firestore.collection('conversations');
  const conversationRef = conversationsRef.doc(docID);
  conversationRef.update({
    mutualConsent: boolean,
  })
    .then(() => {
      setShowChatWindow(true)
      navHandler("Conversations")
      console.log("Document successfully updated!");
    })
}
