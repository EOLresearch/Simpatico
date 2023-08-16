import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeO_aBVdFNQZqvHeQMcEI5-HVR-6WZmU4",
  authDomain: "simpatico-chat.firebaseapp.com",
  projectId: "simpatico-chat",
  storageBucket: "simpatico-chat.appspot.com",
  messagingSenderId: "482031006479",
  appId: "1:482031006479:web:67a10d3e7c80f09ed5447a"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
