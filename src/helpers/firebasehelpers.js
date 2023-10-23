
import { auth, firestore, firebase } from "../firebase-config";
const usersCollection = firestore.collection('users');

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
  console.log('consent toggle')
  const conversationsRef = firestore.collection('conversations');
  const conversationRef = conversationsRef.doc(docID);

  conversationRef.update({
    mutualConsent: boolean,
  })
    .then(() => {
      console.log("Document successfully updated!");
    })
}


export const updateSimpaticoMatch = (uid, matchUid) => {
  if (uid === matchUid) alert("Cannot match with yourself!");
  return usersCollection.doc(uid).update({
    simpaticoMatch: matchUid
  });
}

export const removeSimpaticoMatch = (uid) => {
  return usersCollection.doc(uid).update({
    simpaticoMatch: ''
  });
}

export const reAuth = (email, password, displayToggle, setAnError) => {
  const user = auth.currentUser;

  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );

  user.reauthenticateWithCredential(credential).then(() => {
    // User re-authenticated.
    displayToggle(true)

  }).catch((error) => {
    console.log(error.message)
    setAnError(error.message)
  });
}

export const updateUserEmail = async (uid, newEmail) => {
  const userRef = firestore.collection('users').doc(uid);
  const userAuth = auth.currentUser;

  if (userAuth) {
    await userAuth.updateEmail(newEmail).catch(error => {
      console.error("Error updating email in Auth: ", error);
      throw error;
    });

    await userAuth.sendEmailVerification().catch(error => {
      console.error("Error sending verification email: ", error);
      throw error;
    });
  } else {
    throw new Error("No authenticated user found.");
  }

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
      throw error; 
  }
};

export const updateUserDetails = async (uid, newDetails) => {
  const userRef = firestore.collection('users').doc(uid);
  return userRef.update(newDetails)
    .catch(error => {
      console.error("Error updating user details: ", error);
      throw error;
    });
}
