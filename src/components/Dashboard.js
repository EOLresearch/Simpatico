import './dashboard.css';
// import Questionaire from './Questionaire/Questionaire'
import PrivateChat from './PrivateChat/PrivateChat'
import Profile from './Profile/Profile'

// import React, { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';



import { getAuth } from "firebase/auth";

export default function Dashboard({ firebase, user }) {

  //account options - details to add or update.
  const auth = getAuth();
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const userQuery = usersRef.where("email", "==", user.email)
  const [fsUser] = useCollectionData(userQuery);

  return (
    <div className='dashboard-wrapper'>
      <Profile fsUser={fsUser} firebase={firebase} />
      <PrivateChat firebase={firebase} />
    </div>
  );

}
