import React, { useState } from 'react';



export default function UserCard({ user, setMatch, selectTheUser, selectedUser, showSelectedUser, hovered, removeMatch }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showMatchInput, setShowMatchInput] = useState(false)
  const [matchConfirmMessage, setMatchConfirmMessage] = useState(false)
  const [matchUID, setMatchUID] = useState()


  const matchInputDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowMatchInput(!showMatchInput)
    setMatchUID('')
  }

  const showDetailsDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }


  const matchUser = (e) => {
    e.stopPropagation()
    console.log(e.target.userUID)
  }

  const matchConfirm = (e) => {
    e.stopPropagation()
    if(!selectedUser && matchUID === '') return alert('Please enter a UID or select a user')
    if(matchUID === '' && selectedUser.uid == user.uid) return alert('Please enter a UID or select a user')
    setShowMatchInput(false)
    setMatchConfirmMessage(true)

  }

  const cancelMatchConfirm = (e) => {
    e.stopPropagation()
    setMatchConfirmMessage(false)
    setShowMatchInput(true)
    setMatchUID('')
  }

  const matchDoubleConfirm = (e, uid, matchuid) => {
    e.stopPropagation()
    setMatchConfirmMessage(false)

    if(matchuid)return setMatch(uid, matchuid)
    
    setMatch(uid, selectedUser.uid)
  }

  const changeHandler = (e) => {
    e.stopPropagation()
    setMatchUID(e.target.value)
  }

  const collapsed =
    <div className={
      selectedUser ? selectedUser.uid === user.uid ? hovered === true ? "user-card selected hovered" : "user-card selected" : "user-card" : "user-card"} onClick={e => selectTheUser(e, user)}>
      <div className="card-header">
        <h3>{user.displayName}</h3>
        <div className={user.simpaticoMatch ? "matched" : "not-matched"}>
          <span className="card-label">{user.simpaticoMatch ? "Matched" : "Not Matched"}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="card-row">
          <span className="card-label">Cause: </span>
          <span>&nbsp;{user.cause}</span>
        </div>
        <div className="card-row">
          <span className="card-label">Deceased: </span>
          <span>&nbsp;{user.deceased}</span>
        </div>
        <div className="card-row">
          <span className="card-label">UID: </span>
          <span>&nbsp;{user.uid}</span>
        </div>
        <div className="card-row">
          <span className="card-label">Match: </span>
          <span>&nbsp;{user.simpaticoMatch ? user.simpaticoMatch : "user not matched"}</span>
        </div>

        {user.simpaticoMatch ? <button onClick={e=>removeMatch(e, user)} className='card-btn'>Remove match</button> : <button onClick={matchInputDisplaySwitch} className='card-btn'>Match this user</button>}

        {showMatchInput === true ?
          selectedUser ?
            <div className="match-container" >
              <button className="match-button"
                useruid={user.uid}
                onMouseEnter={e => showSelectedUser(e, true)}
                onMouseLeave={e => showSelectedUser(e, false)}
                onClick={e => matchConfirm(e)}>Match with Selected User</button> ...or
              <div className="sub-container">
                <input className="uid-input" type='text' placeholder='Enter UID'
                  onChange={changeHandler}></input>
                <button className="match-button" onClick={e => matchConfirm(e)}>Match</button>
              </div>
            </div>
            :
            <div className="match-container">
              <button className='match-button' onClick={e => matchConfirm(e)}>Select a user to Match</button> ...or
              <div className='sub-container'>
                <input className="uid-input" type='text' placeholder='Enter UID' onChange={changeHandler}></input>
                <button className="match-button" onClick={e => matchConfirm(e)}>Match</button>
              </div>
            </div>
          : matchConfirmMessage === true ?
            (!selectedUser && matchUID) || (user.uid === selectedUser.uid) ?
              <div className="match-container">
                <span className="match-confirm-message">Match this user with UID: {matchUID} ?</span>
                <button className="match-button" onClick={e => matchDoubleConfirm(e, user.uid, matchUID)}>Confirm</button>
                <button className="match-button" onClick={e => cancelMatchConfirm(e)}>Cancel</button>
              </div>

            :  <div className="match-container">
                <span className="match-confirm-message">Match this user with {selectedUser.displayName} ?</span>
                <button className="match-button" onClick={e => matchDoubleConfirm(e, user.uid)}>Confirm</button>
                <button className="match-button" onClick={e => cancelMatchConfirm(e)}>Cancel</button>
              </div>
              : null }

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
