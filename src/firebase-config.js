import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxg7-rLpEzc7-4AE0l12lVJUbPFef2T2I",
  authDomain: "simpatico-a5b64.firebaseapp.com",
  projectId: "simpatico-a5b64",
  storageBucket: "simpatico-a5b64.appspot.com",
  messagingSenderId: "767358111176",
  appId: "1:767358111176:web:9003318c304d5422e8c4fd",
  measurementId: "G-VC7VQ32QB3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
