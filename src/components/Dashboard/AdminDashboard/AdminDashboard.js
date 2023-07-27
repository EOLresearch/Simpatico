import './admindashboard.css';
import UserDatabase from './UserDatabase';

import { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { IconContext } from "react-icons";

export default function AdminDashboard({ firebase, fsUser, navHandler }) {
  const [showAllUsers, setShowAllUsers] = useState(true)
  const [showCauseMatches, setShowCauseMatches] = useState(false)
  const [showKinshipMatches, setShowKinshipMatches] = useState(false)


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
      case 'Cause':
        setShowCauseMatches(true)
        setShowKinshipMatches(false)
        setShowAllUsers(false)
        return
      case 'Kinship':
        setShowKinshipMatches(true)
        setShowCauseMatches(false)
        setShowAllUsers(false)
        return
      case 'All':
        setShowAllUsers(true)
        setShowCauseMatches(false)
        setShowKinshipMatches(false)
        return
      default:
        return
    }
  }

  return (
    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
          <div className='admin-dashboard-nav'>
            <button onClick={e=>subNavHandler("All")}>All Users</button>
            <button onClick={e=>subNavHandler("Cause")} >Matching on Cause</button>
            <button onClick={e=>subNavHandler("Kinship")} >Matching on Kinship</button>
            <button>Matching on both</button>
            <button>No Match</button>
          </div>
        </div>
        <div className='admin-dashboard-body'>
          <UserDatabase
            firestore={firestore}
            users={users}
            showAllUsers={showAllUsers}
            showCauseMatches={showCauseMatches}
            showKinshipMatches={showKinshipMatches}
          />
        </div>
      </div>
    </div>

  );
}
