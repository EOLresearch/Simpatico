import './admindashboard.css';
import UserDatabase from './UserDatabase';

import { useState, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { IconContext } from "react-icons";

export default function AdminDashboard({ firebase, fsUser, navHandler }) {
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)

  const firestore = firebase.firestore();

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home')
    }
  }, [fsUser, navHandler])

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);


  const selectTheUser = (e, user) => {
    setSelectedUser(user)
  }
  const showSelectedUser = (e, boolean) => {
    e.stopPropagation()
    if (e.target.attributes.useruid.value === selectedUser) return
    setHovered(boolean)
  }

  const setMatch = (useruid, selecteduid) => {
    console.log(useruid)
    console.log(selecteduid)

    const userRef = firestore.collection('users').doc(useruid);
    const selectedRef = firestore.collection('users').doc(selecteduid);

    userRef.update({
      simpaticoMatch: selecteduid
    })

    selectedRef.update({
      simpaticoMatch: useruid
    })

    setHovered(false)
  }

  const removeMatch = (e, user) => {
    const userRef = firestore.collection('users').doc(user.uid);
    const matchRef = firestore.collection('users').doc(user.simpaticoMatch);

    userRef.update({
      simpaticoMatch: ''
    })
    matchRef.update({
      simpaticoMatch: ''
    })
    setHovered(false)
  }


  return (

    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>

          <div className='admin-dashboard-nav'>
            {/* <button onClick={getUsers}>Get Users</button> */}
            <button>filter</button>
            <button>things</button>
          </div>

        </div>
        <div className='admin-dashboard-body'>
          <UserDatabase 
            firestore={firestore}
            hovered={hovered}
            users={users}
            selectTheUser={selectTheUser}
            selectedUser={selectedUser}
            showSelectedUser={showSelectedUser}
            setMatch={setMatch}
            removeMatch={removeMatch}
             />
        </div>
      </div>
    </div>

  );
}
