import './matchlist.css';
import { useState } from "react";

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
      <div key={user.uid} className="display-card match">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}</p>
          </div>
          <div className='right-col'>
            <h4>Details</h4>
            <div className="details">
              <p>{user.displayName}</p>
              <p>{getAge(user.birthDate)}, {user.residence}</p>
            </div>
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
      <div key={user.uid} className="display-card match has-convo">
        <div className="display-card-container">
          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}</p>
          </div>
          <div className='right-col'>
            <h4>Details</h4>
            <div className="details">
              <p>{user.displayName}</p>
              <p>{getAge(user.birthDate)}, {user.residence}</p>
            </div>
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

          
              <div className="convo-invitation">
                <div className="convo-invitation-container">

                  <h4>Invitation to chat</h4>

                  <div className='convo-invitation-body'>
                    <p>{convo.userData.sender.displayName} has sent you a message</p>
                    <p><em>"{convo.firstMessage}"</em></p>
                      <p>Would you like to accept this invitation to chat? </p>
                    <div className='convo-invitation-buttons'>
                      <button onClick={() => convoMutualConsentToggle(convo.docID, true)} className="accept-btn">Accept</button>
                      <button onClick={() => convoMutualConsentToggle(convo.docID, false)} className="decline-btn">Decline</button>
                    </div>
                  </div>
                </div>
              </div>


          <div className='left-col'>
            <img src={user.photoURL} alt="profile-avatar"></img>
            <p>{user.displayName}</p>
          </div>
          <div className='right-col'>
            <h4>Details</h4>
            <div className="details">
              <p>{user.displayName}</p>
              <p>{getAge(user.birthDate)}, {user.residence}</p>
            </div>
            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
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
            <p>{user.displayName}</p>
          </div>
          <div className='right-col'>
            <h4>Details</h4>
            <div className="details">
              <p>{user.displayName}</p>
              <p>{getAge(user.birthDate)}, {user.residence}</p>
              <div className="convo-invitation">
                <div className="convo-invitation-container">
                  <p>You have sent {convo.userData.receiver.displayName} a message request</p>
                  <p>See the Conversations tab for more.</p>
                </div>
              </div>
            </div>
            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
      </div>
    )
  }
}
