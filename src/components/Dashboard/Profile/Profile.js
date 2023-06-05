import './profile.css';
import { useState } from "react";
import { IconContext } from "react-icons";
import { IoPersonAddSharp, IoBookSharp } from "react-icons/io5";
import UpdatePanel from "./UpdatePanel"


export default function Profile({ firestore, user }) {
  const [editUserDetails, setEditUserDetails] = useState(false)

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

  function userDetailsHandler(e, boolean) {
    setEditUserDetails(boolean)
  }

  if (editUserDetails === true) {
    return <UpdatePanel firestore={firestore} fsUser={user} userDetailsHandler={userDetailsHandler} />
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      {
        user ?
          <div className='profile-container'>
            <div className='display-card'>
              <div className='image-container'>
                <img className='profile-image' src={user.photoURL} />
                {/* <p>{user.displayName.split(" ")[0]}</p> */}
              </div>
              <div className='profile-body'>
                <p><strong>Hello, {user.displayName}.</strong></p>
                <div className='body'>

                  <p>Thank you for joining <strong>SIMPATICO</strong>.</p>
                  <p>This application is designed for you to create positive social interactions with others who have experienced a similar loss. We ask that you log in at least once a day to chat with your SIMPATICO match. You can see your personal details below and edit them as you wish.</p>
                  <p>Our goal is to help you find someone who can relate to your loss. We hope that you will find comfort in sharing your story and listening to the stories of others. We are here to help you through your grief journey.</p>

                  <div className='edit-user-details' onClick={e => userDetailsHandler(e, true)}>
                    <p className='profile-btn'><IoBookSharp /> <span>View and Edit user details</span> </p>
                  </div>

                </div>

                {/* <h4>My Details</h4>
                <p className='details'>{getAge(user.birthDate)}, {user.residence}<br />Lost Relationship: {user.deceased}, {user.cause}</p>
                <h4>My Story</h4>
                <p className='story'>{user.lossExp}</p> */}
              </div>
            </div>
          </div>
          : null
      }
    </IconContext.Provider>
  )
}
