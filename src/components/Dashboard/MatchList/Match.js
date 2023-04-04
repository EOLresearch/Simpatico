import './matchlist.css';
import { useState } from "react";


export default function Match({ user, createConvo, convo, convoMutualConsent }) {
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

  if (!convo){
    return (
      <div key={user.uid} className="display-card match">
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
          <label htmlFor="inputer">Leave a supportive message for {user.displayName}</label>
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
            <p>{user.displayName}</p>
            <p>{getAge(user.birthDate)}, {user.residence}</p>
            <h4>Story</h4>
            <p>{user.lossExp}</p>
          </div>
        </div>
        <form onSubmit={e => createConvo(e, message, user)} className="input-container-match">
          <label htmlFor="inputer">You have an ongoing conversation with {user.displayName}, check the Conversations tab to respond.</label>
          <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
          <button type='submit' ><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    )
  }

  if (convo.mutualConsent === false && convo.userData.sender.uid === user.uid) {
    return (
      <div key={user.uid} className="display-card match has-convo">
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
        <div className="convo-invitation">
          <p>{convo.userData.sender.displayName} has sent you a message, you can see their details above.</p>
          <p>Would you like to start a conversation?</p>
          <button onClick={() => convoMutualConsent(convo.docID, true)} className="accept-btn">Accept</button>
          <button onClick={() => convoMutualConsent(convo.docID, false)} className="decline-btn">Decline</button>
        </div>
        {/* <form onSubmit={e => createConvo(e, message, user)} className="input-container-match">
          <label htmlFor="inputer">You have received a message from {convo.userData.sender.displayName} </label>
          <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
          <button type='submit' ><i className="fas fa-paper-plane"></i></button>
        </form> */}
      </div>
    )
  }

  if (convo.mutualConsent === false && convo.userData.receiver.uid === user.uid) {
    return (
      <div key={user.uid} className="display-card match has-convo">
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
          <label htmlFor="inputer">You have started a conversation with {user.displayName}, to send messages, check the Conversations tab</label>
          <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
          <button type='submit' ><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>

    )
  }

}
