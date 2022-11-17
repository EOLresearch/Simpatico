
import './App.css';
import Chat from './components/Chat'
import Dashboard from './components/Dashboard'
import Auth from './components/Auth'


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDBEtpwRvwCXly_lclR91PpXCiSmolzaAI",
  authDomain: "simpatico-pilot.firebaseapp.com",
  projectId: "simpatico-pilot",
  storageBucket: "simpatico-pilot.appspot.com",
  messagingSenderId: "577382292427",
  appId: "1:577382292427:web:f61f22230b553746b7344e"

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
          {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;