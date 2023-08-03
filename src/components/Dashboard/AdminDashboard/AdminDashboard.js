import './admindashboard.css';
import UserDisplay from './UserDisplay/UserDisplay';
import { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore, auth } from '../../../firebase-config';

// import { IconContext } from "react-icons";

export default function AdminDashboard({ fsUser, navHandler }) {
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
          <UserDisplay
            firestore={firestore}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}
