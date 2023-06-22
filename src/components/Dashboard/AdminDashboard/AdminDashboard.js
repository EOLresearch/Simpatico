import './admindashboard.css';
// import Conversations from './Conversations/Conversations'
// import MatchList from './MatchList/MatchList'
// import Profile from './Profile/Profile'


import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function AdminDashboard({ user, fsUser, navHandler, auth}) {

  useEffect(() => {
    if (!fsUser.admin || fsUser.admin === false) {
      navHandler('Home')
    }
  }, [fsUser])


  return (


      <div className='admin-dashboard-container'>
        <div className='admin-dashboard'>
          <div className='admin-dashboard-header'>
            <h1>Admin Dashboard</h1>
          </div>
          <div className='admin-dashboard-body'>
            <div className='admin-dashboard-body-left'>
              <div className='admin-dashboard-body-left-top'>
                <div className='admin-dashboard-body-left-top-left'>
                  <h2>Users</h2>
                  <button >Get Users</button>
                </div>
                <div className='admin-dashboard-body-left-top-right'>
                  <h2>Matches</h2>
                  <button>Get Matches</button>
                </div>
              </div>

              <div className='admin-dashboard-body-left-bottom'>
                <div className='admin-dashboard-body-left-bottom-left'>
                  <h2>Conversations</h2>
                  <button>Get Conversations</button>
                </div>
                <div className='admin-dashboard-body-left-bottom-right'>
                  <h2>Messages</h2>
                  <button>Get Messages</button>
                </div>
              </div>
            </div>
            <div className='admin-dashboard-body-right'>
              <h2>Admin Tools</h2>
              <button>Get Users</button>
              <button>Get Matches</button>
              <button>Get Conversations</button>
              <button>Get Messages</button>
            </div>
          </div>
        </div>


      </div>

  );
}
