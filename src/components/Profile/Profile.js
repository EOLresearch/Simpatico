import './profile.css';
import { useState } from "react";

import { IconContext } from "react-icons";
import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

export default function Profile({ user }) {



  return (
    <IconContext.Provider value={{ className: "react-icons-welcome" }}>
      <div className='profile-container'>

        <div className='sub-nav'>
          <div><RxPerson size="3rem" />My Profile</div>
          <div><IoPeopleCircleOutline size="3rem" />Matches</div>
          <div><IoChatbubblesSharp size="3rem" />Conversations</div>
        </div>

        {
          user ?
            <div className='profile-card'>
              <div >
                <img className='profile-image' src={user.photoURL} />
              </div>
              <div className='profile-body'>
                <h1>Simpatico</h1>
                <h3>Home Page Welcome Message</h3>
                <p>This is where we can introduce the study and details on how best to use this app.</p>
              </div>

            </div> : null

        }
      </div>
    </IconContext.Provider>
  )
}