import React, { useState } from 'react';



export default function UserCard({ user, setMatch, selectTheUser, selectedUser, showSelectedUser, hovered }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showMatchInput, setShowMatchInput] = useState(false)
  const [matchConfirmMessage, setMatchConfirmMessage] = useState(false)
  const [matchUID, setMatchUID] = useState()


  const matchInputDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowMatchInput(!showMatchInput)
  }

  const showDetailsDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  const matchUser = (e) => {
    e.stopPropagation()
    console.log(e.target.userUID)
  }


  const collapsed =
    <div className={
      selectedUser === user.uid ? hovered === true ? "user-card selected hovered" : "user-card selected" : "user-card"} onClick={e => selectTheUser(e, user.uid)}>
      <div className="card-header">
        <h3>{user.displayName}</h3>
        <div className={user.simpaticoMatch ? "matched" : "not-matched"}>
          <span className="card-label">{user.simpaticoMatch ? "Matched" : "Not Matched"}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="card-row">
          <span className="card-label">Cause:</span>
          <span>{user.cause}</span>
        </div>
        <div className="card-row">
          <span className="card-label">Deceased:</span>
          <span>{user.deceased}</span>
        </div>
        <div className="card-row">
          <span className="card-label">UID:</span>
          <span>{user.uid}</span>
        </div>

        {user.simpaticoMatch ? null : <button onClick={matchInputDisplaySwitch} className='card-btn'>Match this user</button>}
        {showMatchInput === true ?

          selectedUser ?
            <div className="match-container" >
              <button className="match-button"
                useruid={user.uid}
                onMouseEnter={e => showSelectedUser(e, true)}
                onMouseLeave={e => showSelectedUser(e, false)}
                onClick={e=>setMatch(true)}>Match with Selected User</button> ...or
              <div className="sub-container">
                <input className="uid-input" type='text' placeholder='Enter UID'
                  onChange={null}
                  onClick={e => matchUser(e)}></input>
                <button className="match-button" onClick={null}>Match</button>
              </div>
            </div>
            :
            <div className="match-container">
              <button className='match-button' onClick={null}>Select a user to Match</button> ...or
              <div className='sub-container'>
              <input className="uid-input" type='text' placeholder='Enter UID' onChange={null}></input>
              <button className="match-button" onClick={null}>Match</button>
              </div>
            </div>
          : null}

        <button className="card-btn" onClick={showDetailsDisplaySwitch}>Show Details</button>
      </div>
    </div>






  const exp =
  <div className={
    selectedUser === user.uid ? hovered === true ? "user-card selected hovered" : "user-card selected" : "user-card"} onClick={e => selectTheUser(e, user.uid)}>
    <div className="card-header">
      <h3>{user.displayName}</h3>
      <div className={user.simpaticoMatch ? "matched" : "not-matched"}>
        <span className="card-label">{user.simpaticoMatch ? "Matched" : "Not Matched"}</span>
      </div>
    </div>

    <div className="card-content">
      <div className="card-row">
        <span className="card-label">Cause:</span>
        <span>{user.cause}</span>
      </div>
      <div className="card-row">
        <span className="card-label">Deceased:</span>
        <span>{user.deceased}</span>
      </div>
      <div className="card-row">
        <span className="card-label">UID:</span>
        <span>{user.uid}</span>
      </div>

      {user.simpaticoMatch ? null : <button onClick={matchInputDisplaySwitch} className='card-btn'>Match this user</button>}
      {showMatchInput === true ?

        selectedUser ?
          <div className="match-container">
            <button className="match-button"
              onMouseEnter={e => showSelectedUser(e, true)}
              onMouseLeave={e => showSelectedUser(e, false)}
              onClick={null}>Match with Selected User</button> ...or
            <div className="sub-container">
              <input className="uid-input" type='text' placeholder='Enter UID'
                onChange={null}
                onClick={e => matchUser(e)}></input>
              <button className="match-button" onClick={null}>Match</button>
            </div>
          </div>
          :
          <div className="match-container">
            <input className="uid-input" type='text' placeholder='Enter UID' onChange={null}></input>
            <button className="match-button" onClick={null}>Match</button>
          </div>
        : null}
        <button className="card-btn" onClick={showDetailsDisplaySwitch}>Hide Details</button>

        <div className="card-details">
          <div className="card-row">
            <span className="card-label">Loss Date:</span>
            <span>{user.lossDate}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Birth Date:</span>
            <span>{user.birthDate}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Residence:</span>
            <span>{user.residence}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Household:</span>
            <span>{user.household}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Education:</span>
            <span>{user.education}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Hobbies:</span>
            <span>{user.hobbies}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Loss Experience:</span>
            <span>{user.lossExp}</span>
          </div>
          <div className="card-row">
            <span className="card-label">BioSex:</span>
            <span>{user.bioSex}</span>
          </div>
          <div className="card-row">
            <span className="card-label">Race/Ethnicity:</span>
            <span>{user.raceEthnicity}</span>
          </div>
        </div>

      </div>
    </div>


  return (

    <div>
      {showDetails ? exp : collapsed}
    </div>
  );
};
