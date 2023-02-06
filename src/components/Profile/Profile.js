import './profile.css';
import { useState } from "react";

import { IconContext } from "react-icons";
import { RxPerson } from "react-icons/rx";
import { IoPeopleCircleOutline, IoChatbubblesSharp, IoHome } from "react-icons/io5";

export default function Profile({ user }) {

  const firstName = user.displayName.split(" ")

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      <div className='profile-container'>
        <div className='display-card'>
          <div className='image-container'>
            <img className='profile-image' src={user.photoURL} />
            <p>{firstName[0]}</p>
          </div>

          <div className='profile-body'>
            <p><strong>Hello, {user.displayName}.</strong></p>
            <p className='body'>You have been matched with 3 other users who have suffered a very similar loss. You can see their stories, and start a conversation in the "Matches" tab. </p>

            <h4>My Details</h4>
            <p className='details'>57, Male, NY<br />Lost Relationship: Partner</p>
            <h4>My Story</h4>
            <p className='story'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}