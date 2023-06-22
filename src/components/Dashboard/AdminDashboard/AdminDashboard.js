import './admindashboard.css';
// import Conversations from './Conversations/Conversations'
// import MatchList from './MatchList/MatchList'
// import Profile from './Profile/Profile'


import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function AdminDashboard({ firebase, user, fsUser, navHandler, auth }) {
  const [users, setUsers] = useState([])

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




  return (

    <div className='admin-dashboard-container'>
      <div className='admin-dashboard'>
        <div className='admin-dashboard-header'>
          <h1>Admin Dashboard</h1>
        </div>
        <div className='admin-dashboard-body'>
          <button onClick={getUsers}>Get Users</button>

          {/* <div>
            {users.map((user, index) => {
              return (
                <div key={index}>
                  <p>{user.displayName}</p>
                  <p>{user.email}</p>
                </div>
              )
            })}

          </div> */}

          {/* <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>

                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.uid}>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

<div className="card-layout">
      {users.map(user => (
        <div className="card" key={user.id}>
          <img src={user.image} alt="User" className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{user.name}</h3>
            <p className="card-email">{user.email}</p>
          </div>
        </div>
      ))}
    </div>

        </div>
      </div>
    </div>

  );
}
