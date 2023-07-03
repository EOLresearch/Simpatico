import './admindashboard.css';
import UserDatabase from './UserDatabase';

import { useEffect } from "react";
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

  return (

    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
          <div className='admin-dashboard-nav'>
            <button>All Users</button>
            <button>Matching on Cause</button>
            <button>Matching on Kinship</button>
            <button>Matching on both</button>
            <button>No Match</button>
          </div>
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
