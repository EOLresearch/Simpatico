// helpers/firebase.js

import { firestore } from "../firebase-config";

export const createConvo = async (uid, fsUser, message, user) => {
  try {
    const documentID = `${uid} + ${user.uid}`;
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

    await conversationRef.set(newConvo)

    const msgDocRef = conversationRef.collection('messages').doc()
    await msgDocRef.set({
      mid: msgDocRef.id,
      body: message,
      createdAt: firestore.FieldValue.serverTimestamp(),
      sentFromUid: uid,
      sentFromDisplayName: fsUser.displayName,
      photoURL: fsUser.photoURL,
    })
  } catch (error) {
    console.error("Error creating conversation: ", error);
  }
}

export const convoMutualConsentToggle = async (docID, boolean) => {
  try {
    const conversationsRef = firestore.collection('conversations');
    const conversationRef = conversationsRef.doc(docID);

    await conversationRef.update({
      mutualConsent: boolean,
    })
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating mutual consent: ", error);
  }
}
