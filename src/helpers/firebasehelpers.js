
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

export const reAuth = (email, password, displayToggle) => {
  const user = auth.currentUser;

  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );

  user.reauthenticateWithCredential(credential).then(() => {
    // User re-authenticated.
    displayToggle(true)

  }).catch((error) => {
    // An error occurred
    // ...
  });
}

export const updateUserEmail = async (uid, newEmail) => {
  const userRef = firestore.collection('users').doc(uid);
  const userAuth = auth.currentUser;

  // First, update the email in Firebase Auth
  if (userAuth) {
    await userAuth.updateEmail(newEmail).catch(error => {
      console.error("Error updating email in Auth: ", error);
      throw error;
    });

    // Send verification email to the new email address
    await userAuth.sendEmailVerification().catch(error => {
      console.error("Error sending verification email: ", error);
      throw error;
    });
  } else {
    throw new Error("No authenticated user found.");
  }

  // Then, update the email in Firestore
  return userRef.update({ email: newEmail })
    .catch(error => {
      console.error("Error updating email in Firestore: ", error);
      throw error;
    });
};

export const sendResetPasswordEmail = async (email) => {
  try {
      await auth.sendPasswordResetEmail(email);
      console.log("Password reset email sent!");
  } catch (error) {
      console.error("Error sending password reset email: ", error);
      throw error; // Forward the error so you can notify the user or handle it in your UI.
  }
};