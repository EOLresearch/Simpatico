
import UserAuth from './components/UserAuth/UserAuth'
import Dashboard from './components/Dashboard'
// import Dashboard from './components/Dashboard'


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

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
          {user ? <PrivateChat /> : <UserAuth user={user} firebase={firebase} />} 
          <LogOut />
    </div>
  );
}



// -----------------------------------------------



function LogOut() {

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Log Out</button>
  )

}

function PrivateChat() {

  const chatRef = firestore.collection('messages');
  const query = chatRef.orderBy('createdAt').limit(25);
 

  const [messages = []] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('')

  const zoomHandle = useRef()

  const sendThatThang = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await chatRef.add({
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    zoomHandle.current.scrollIntoView({behavior: 'smooth'})

  }

  return (
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage mid={msg.id} message={msg} />)}

      <div ref={zoomHandle}></div>
    </div>

    <form onSubmit={sendThatThang}>
      <input value={formValue} onChange={e => setFormValue(e.target.value)}/>
      <button type="submit">🚀</button>
    </form>

    </>
  )
}

function ChatMessage({ mid, message }) {
  
  const msgStyle = message.uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div key={mid} className={`message ${msgStyle}`}>
      {/* <img src={message.photoURL} /> */}
      <p>{message.body}</p>
    </div>
  )

}



export default App;