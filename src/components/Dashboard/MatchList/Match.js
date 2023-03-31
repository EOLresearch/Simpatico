import './matchlist.css';
import { useState } from "react";


export default function Match({ user, createConvo, convo }) {
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

  function dynamicMessage() {
    if (!convo) return `Leave a supportive message for ${user.displayName}`
    if (convo.mutualConsent === true) return `You have an ongoing conversation with ${user.displayName}, check the Conversations tab to respond.`
    if (convo.userData.sender.uid === user.uid) return `You have received a message from ${convo.userData.sender.displayName}, check the Conversations tab to approve or decline.`
    if (convo.userData.receiver.uid === user.uid) return `You have started a conversation with ${user.displayName}, to send messages, check the Conversations tab`
  }

  const matchStyles = convo ? 'display-card match has-convo' : 'display-card match'

  return (
    <div key={user.uid} className={matchStyles}>
      <div className="display-card-container">
        <div className='left-col'>
          <img src={user.photoURL} alt="profile-avatar"></img>
          <p>{user.displayName}</p>
        </div>
        <div className='right-col'>
          <h4>Details</h4>
          <p>{user.displayName}</p>
          <p>{getAge(user.birthDate)}, {user.residence}</p>
          <h4>Story</h4>
          <p>{user.lossExp}</p>
        </div>
      </div>
      <form onSubmit={e => createConvo(e, message, user)} className="input-container-match">
        <label htmlFor="inputer">{dynamicMessage()}</label>
        <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
        <button type='submit' ><i className="fas fa-paper-plane"></i></button>
      </form>
    </div>
  )
}
