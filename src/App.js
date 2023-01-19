
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard'
//-----------------------------------------------------
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAxg7-rLpEzc7-4AE0l12lVJUbPFef2T2I",
  authDomain: "simpatico-a5b64.firebaseapp.com",
  projectId: "simpatico-a5b64",
  storageBucket: "simpatico-a5b64.appspot.com",
  messagingSenderId: "767358111176",
  appId: "1:767358111176:web:9003318c304d5422e8c4fd",
  measurementId: "G-VC7VQ32QB3"
})

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {
        user ? 
            <Dashboard auth={auth} firebase={firebase} /> : <UserAuth auth={auth} firebase={firebase}/>
      }
    </div>
  );
}


export default App;