import './admindashboard.css';
import UserDatabase from './UserDatabase';

import { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { IconContext } from "react-icons";

export default function AdminDashboard({ firebase, fsUser, navHandler }) {
  const [showAllUsers, setShowAllUsers] = useState(true)
  const [showNatural, setShowNatural] = useState(false)
  const [showUnnatural, setShowUnnatural] = useState(false)
  const [showKinshipFilters, setShowKinshipFilters] = useState(false)


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
      case 'All':
        setShowAllUsers(true)
        setShowNatural(false)
        setShowUnnatural(false)
        setShowKinshipFilters(false)
        return
      case 'Natural':
        setShowAllUsers(false)
        setShowNatural(true)
        setShowUnnatural(false)
        setShowKinshipFilters(false)
        return
      case 'Unnatural':
        setShowAllUsers(false)
        setShowNatural(false)
        setShowUnnatural(true)
        setShowKinshipFilters(false)
        return
      case 'Kinship':
        setShowAllUsers(false)
        setShowNatural(false)
        setShowUnnatural(false)
        setShowKinshipFilters(true)
        return
      default:
        console.log('switch default' + renderCondition)
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
            <button onClick={e=>subNavHandler("Natural")} >Natural Causes</button>
            <button onClick={e=>subNavHandler("Unnatural")} >Unnatural Causes</button>
            <button onClick={e=>subNavHandler("Kinship")}>Kinship Filters</button>
          </div>
        </div>
        <div className='admin-dashboard-body'>
          <UserDatabase
            firestore={firestore}
            users={users}
            showAllUsers={showAllUsers}
            showNatural={showNatural}
            showUnnatural={showUnnatural}
            showKinshipFilters={showKinshipFilters}
          />
        </div>
      </div>
    </div>

  );
}
