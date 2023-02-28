


import './matchlist.css';

export default function Match({ user, createConvo }) {


  return (

    <div key={user.uid} className='display-card match'>
      <div className="display-card-container">
        <div className='left-col'>
          <img src={user.photoURL}></img>
          <p>{user.displayName}<br />{user.email}</p>
        </div>
        <div className='right-col'>
          <h4>Details</h4>
          <p>53, Male, NJ</p>
          <h4>Story</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
      </div>
      <div className="input-container-match">
        <label htmlFor="inputer">Leave a supportive message for {user.displayName}</label>
        <input id="inputer" type="text" placeholder="Start a Conversation"></input>
        <button onClick={e => createConvo(user)} ><i className="fas fa-paper-plane"></i></button>
      </div>
    </div>
  )

}
