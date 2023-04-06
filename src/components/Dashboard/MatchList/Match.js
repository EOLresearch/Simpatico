import './matchlist.css';
import { useState } from "react";
import ConvoInvite from '../ConvoInvite/ConvoInvite'

export default function Match({ user, createConvo, convo, convoMutualConsentToggle }) {
  const [message, setMessage] = useState('')

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

  if (!convo) {
    return (
      <div key={user.uid} className="display-card match ">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}, {getAge(user.birthDate)}, {user.residence} </p>
          </div>
          <div className='right-col'>

            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
      </div>
    )
  }

  if (convo.mutualConsent === true) {
    return (
      <div key={user.uid} className="display-card match ">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}, {getAge(user.birthDate)}, {user.residence} </p>
          </div>
          <div className='right-col'>

            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
      </div>
    )
  }

  // THEY are the sender
  if (convo.mutualConsent === false && convo.userData.sender.uid === user.uid) {
    const msgDate = new Date(convo.createdAt.seconds * 1000).toLocaleString().split(',')[0]
    return (
      <div key={user.uid} className="display-card match ">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}, {getAge(user.birthDate)}, {user.residence} </p>
          </div>
          <div className='right-col'>
            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
       <ConvoInvite fsUser={user} convo={convo} convoMutualConsentToggle={convoMutualConsentToggle} createConvo={createConvo} />
      </div>
    )
  }

  //THEY are the receiver
  if (convo.mutualConsent === false && convo.userData.receiver.uid === user.uid) {
    return (
      <div key={user.uid} className="display-card match ">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}, {getAge(user.birthDate)}, {user.residence} </p>
          </div>
          <div className='right-col'>

            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
      </div>
    )
  }
}
