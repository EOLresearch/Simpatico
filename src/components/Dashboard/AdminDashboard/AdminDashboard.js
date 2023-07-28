import './admindashboard.css';
import UserDatabase from './UserDatabase';
import { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { IconContext } from "react-icons";

export default function AdminDashboard({ firebase, fsUser, navHandler }) {

  const firestore = firebase.firestore();

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home')
    }
  }, [fsUser, navHandler])

  const usersRef = firestore.collection('users');
  const [users] = useCollectionData(usersRef);

  const subNavHandler = (renderCondition) => {
    switch (renderCondition) {

    }
  }

  return (
    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
          {/* <div className='admin-dashboard-nav'>
            <button onClick={e=>subNavHandler("Cards")}>Card View</button>
            <button onClick={e=>subNavHandler("Table")} >Table View</button>
          </div> */}
        </div>
        <div className='admin-dashboard-body'>
          <UserDatabase
            firestore={firestore}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}
