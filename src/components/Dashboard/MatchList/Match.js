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
        <form onSubmit={e => createConvo(e, message, user)} className="input-container-match">
          <label htmlFor="inputer">Send a supportive message to {user.displayName}</label>
          <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
          <button type='submit' ><i className="fas fa-paper-plane"></i></button>
        </form>
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
        <div className='sent-request'>
          <p>You have an active conversation with {user.displayName}.</p>
          <p>See the conversations tab for the latest messages.</p>
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
        <div className='sent-request'>
          <p>
            You have sent a chat request to {convo.userData.receiver.displayName}
            {/* on {new Date(convo.createdAt.seconds * 1000).toLocaleString().split(',')[0] */}
          </p>
          <p>
            Check the conversations tab to see if they have responded.
          </p>
        </div>
      </div>
    )
  }
}
