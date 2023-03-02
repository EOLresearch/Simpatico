import './matchlist.css';

export default function Match({ user, createConvo }) {

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
  //heres a candidate for a ulility function in a separate file, it is also in Profile.js

  return (

    <div key={user.uid} className='display-card match'>
      <div className="display-card-container">
        <div className='left-col'>
          <img src={user.photoURL}></img>
          <p>{user.displayName}<br />{user.email}</p>
        </div>
        <div className='right-col'>
          <h4>Details</h4>
          <p>{user.displayName}</p>
          <p>{getAge(user.birthDate)}, {user.residence}</p>
          <h4>Story</h4>
          <p>{user.lossExp}</p>
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
