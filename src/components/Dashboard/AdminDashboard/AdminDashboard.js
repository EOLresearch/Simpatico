import './admindashboard.css';
import UserCard from './UserCard'

import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

export default function AdminDashboard({ firebase, users, fsUser, navHandler, auth }) {
  // const [users, setUsers] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)

  const firestore = firebase.firestore();

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home')
    }
  }, [fsUser, navHandler])


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

        <div className='admin-dashboard-nav'>
          {/* <button onClick={getUsers}>Get Users</button> */}
          <button>filter</button>
          <button>things</button>
        </div>

      </div>
      <div className='admin-dashboard-body'>

        <div className="user-database">
          {users.map(user => (
            <UserCard key={user.uid} user={user} setMatch={setMatch} selectTheUser={selectTheUser} selectedUser={selectedUser} showSelectedUser={showSelectedUser} hovered={hovered} removeMatch={removeMatch} />
          ))}
        </div>




        {/* <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('displayName')}>Display Name</th>
                  <th onClick={() => handleSort('email')}>Email</th>
                  <th onClick={() => handleSort('birthDate')}>Birth Date</th>
                  <th onClick={() => handleSort('deceased')}>Deceased</th>
                  <th onClick={() => handleSort('cause')}>Cause</th>
                  <th onClick={() => handleSort('lossDate')}>Loss Date</th>
                  <th onClick={() => handleSort('simpaticoMatch')}>Match</th>
                  <th onClick={() => handleSort('bioSex')}>BioSex</th>
                  <th onClick={() => handleSort('education')}>Education</th>
                  <th onClick={() => handleSort('hobbies')}>Hobbies</th>
                  <th onClick={() => handleSort('household')}>Household</th>
                  <th onClick={() => handleSort('lossExp')}>Loss Experience</th>
                  <th onClick={() => handleSort('raceEthnicity')}>Race/Ethnicity</th>
                  <th onClick={() => handleSort('residence')}>Residence</th>
                  <th onClick={() => handleSort('uid')}>UID</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map(user => (
                  <tr key={user.uid}>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.birthDate}</td>
                    <td>{user.deceased}</td>
                    <td>{user.cause}</td>
                    <td>{user.lossDate}</td>
                    <td>{user.simpaticoMatch}</td>
                    <td>{user.bioSex}</td>
                    <td>{user.education}</td>
                    <td>{user.hobbies}</td>
                    <td>{user.household}</td>
                    <td>{user.lossExp}</td>
                    <td>{user.raceEthnicity}</td>
                    <td>{user.residence}</td>
                    <td>{user.uid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

      </div>
    </div>
  </div>

);
}
