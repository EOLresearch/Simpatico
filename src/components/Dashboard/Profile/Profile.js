import './profile.css';
import { useState } from "react";
import { IconContext } from "react-icons";

export default function Profile({ user }) {

  function getAge(date) {
    const today = new Date();
    const bday = new Date(date);
    let age = today.getFullYear() - bday.getFullYear();
    let m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      {
        user ?
          <div className='profile-container'>
            <div className='display-card'>
              <div className='image-container'>
                <img className='profile-image' src={user.photoURL} />
                <p>{user.displayName.split(" ")[0]}</p>
              </div>
              <div className='profile-body'>
                <p><strong>Hello, {user.displayName}.</strong></p>
                <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
                <h4>My Details</h4>
                <p className='details'>{getAge(user.birthDate)}, Male, NY<br />Lost Relationship: </p>
                <h4>My Story</h4>
                <p className='story'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
            </div>
          </div>
          : null
      }
    </IconContext.Provider>
  )
}
