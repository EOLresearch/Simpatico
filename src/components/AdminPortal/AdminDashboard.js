import './admindashboard.css';
// import Conversations from './Conversations/Conversations'
// import MatchList from './MatchList/MatchList'
// import Profile from './Profile/Profile'


import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function AdminDashboard(props) {
 // matching users
 // 4 groups, matching on both, matching on cause, matching on kinship, and not matching at all. 

 // get all users and sort here - everything will be a button, nothing happening on Load

 // get users button
 // --> a list of users will be generated and displayed 
 // ---> create pairs, first for matching on both. loop the users array, if they have both cause and kinship they get paired together and dislpayed together
 
 function getUsers(){

    // users collection query
    // users collectin get all users

    
 }
 
  return (
    <IconContext.Provider value={{ className: "react-icons-admindash" }}>
      <div className='admin-dashboard-container'>

      </div>
    </IconContext.Provider>
  );
}
