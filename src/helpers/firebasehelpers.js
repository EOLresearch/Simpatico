
import { auth, firestore, firebase } from "../firebase-config";

export const createConvo = (e, fsUser, message, user) => {
  e.preventDefault();
  const documentID = `${fsUser.uid} + ${user.uid}`;
  const conversationsRef = firestore.collection('conversations');
  const conversationRef = conversationsRef.doc(documentID);

  const newConvo = {
    users: [fsUser.uid, user.uid],
    userData: {
      sender: fsUser,
      receiver: user,
    },
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    docID: documentID,
    mutualConsent: false,
    firstMessage: message,
  }
  conversationRef.set(newConvo)

  const msgDocRef = conversationRef.collection('messages').doc()
  msgDocRef.set({
    mid: msgDocRef.id,
    body: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    sentFromUid: fsUser.uid,
    sentFromDisplayName: fsUser.displayName,
    photoURL: fsUser.photoURL,
  })
}

export const convoMutualConsentToggle = (docID, boolean) => {
  const conversationsRef = firebase.firestore.collection('conversations');
  const conversationRef = conversationsRef.doc(docID);

  conversationRef.update({
    mutualConsent: boolean,
  })
    .then(() => {
      console.log("Document successfully updated!");
    })
}

const usersCollection = firestore.collection('users');

export const updateSimpaticoMatch = (uid, matchUid) => {
  return usersCollection.doc(uid).update({
    simpaticoMatch: matchUid
  });
}

export const removeSimpaticoMatch = (uid) => {
  return usersCollection.doc(uid).update({
    simpaticoMatch: ''
  });
}

export const reAuth = (email, password) => {
  const user = auth.currentUser;

  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );

  user.reauthenticateWithCredential(credential).then(() => {
    // User re-authenticated.
    console.log('reauthenticated')
  }).catch((error) => {
    // An error occurred
    // ...
  });
}