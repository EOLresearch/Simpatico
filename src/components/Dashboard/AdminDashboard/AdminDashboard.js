import './admindashboard.css';
// import Conversations from './Conversations/Conversations'
// import MatchList from './MatchList/MatchList'
// import Profile from './Profile/Profile'


import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function AdminDashboard({ firebase, user, fsUser, navHandler, auth }) {
  const [users, setUsers] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const firestore = firebase.firestore();



  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home')
    }
  }, [fsUser, navHandler])

  function getUsers() {
    const usersRef = firestore.collection('users');
    usersRef.get().then((querySnapshot) => {
      let dataArr = []
      querySnapshot.forEach((doc) => {
        console.log("1 Doc Read")
        dataArr.push(doc.data())
      });
      setUsers(dataArr)
    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  // Function to handle column header click and sort the table
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to compare values based on the current sort configuration
  const compareValues = (key, direction = 'ascending') => {
    return function (a, b) {
      const valueA = a[key];
      const valueB = b[key];

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return direction === 'descending' ? comparison * -1 : comparison;
    };
  };

  // Apply sorting to the users array based on the current sort configuration
  const sortedUsers = users.slice().sort(compareValues(sortConfig.key, sortConfig.direction));



  return (

    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
        </div>
        <div className='admin-dashboard-body'>
          <button onClick={getUsers}>Get Users</button>

          <div className="user-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('bioSex')}>BioSex</th>
            <th onClick={() => handleSort('birthDate')}>Birth Date</th>
            <th onClick={() => handleSort('cause')}>Cause</th>
            <th onClick={() => handleSort('deceased')}>Deceased</th>
            <th onClick={() => handleSort('displayName')}>Display Name</th>
            <th onClick={() => handleSort('education')}>Education</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('hobbies')}>Hobbies</th>
            <th onClick={() => handleSort('household')}>Household</th>
            <th onClick={() => handleSort('lossDate')}>Loss Date</th>
            <th onClick={() => handleSort('lossExp')}>Loss Experience</th>
            <th onClick={() => handleSort('raceEthnicity')}>Race/Ethnicity</th>
            <th onClick={() => handleSort('residence')}>Residence</th>
            <th onClick={() => handleSort('uid')}>UID</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.uid}>
              <td>{user.bioSex}</td>
              <td>{user.birthDate}</td>
              <td>{user.cause}</td>
              <td>{user.deceased ? 'Yes' : 'No'}</td>
              <td>{user.displayName}</td>
              <td>{user.education}</td>
              <td>{user.email}</td>
              <td>{user.hobbies}</td>
              <td>{user.household}</td>
              <td>{user.lossDate}</td>
              <td>{user.lossExp}</td>
              <td>{user.raceEthnicity}</td>
              <td>{user.residence}</td>
              <td>{user.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>
      </div>
    </div>

  );
}
