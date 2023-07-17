import React, { useState } from 'react';
import './usercard.css'



export default function UserCard({ user, setMatch, getMatchBy, selectTheUser, selectedUser, showSelectedUser, hovered, removeMatch }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showMatchingOptions, setShowMatchingOptions] = useState(false)
  const [matchConfirmMessage, setMatchConfirmMessage] = useState(false)
  const [toolTip, setToolTip] = useState('')
  const [matchUID, setMatchUID] = useState()

  // =========================== GET THE LAST LOGIN AND ADD IT TO THE USER CARD FOR QUICK VIEWING ===========================


  const matchInputDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowMatchingOptions(!showMatchingOptions)
    setMatchUID('')
  }

  const showDetailsDisplaySwitch = (e) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  const matchConfirm = (e) => {
    console.log(e.target)

    if (e.target.dataset.tooltip === "cause") return matchRandomlyBy(e, "cause")
    if (e.target.dataset.tooltip === "kinship") return matchRandomlyBy(e, "kinship")
    if (e.target.dataset.tooltip === "both") return matchRandomlyBy(e, "both")
    if (e.target.dataset.tooltip === "none") return matchRandomlyBy(e, "none")

    e.stopPropagation()
    if (selectedUser.simpaticoMatch) return alert('Selected user is already matched')
    setShowMatchingOptions(false)
    setMatchConfirmMessage(true)
  }

  const matchRandomlyBy = (e, type) => {
    e.stopPropagation()
    setShowMatchingOptions(false)
    if (type === "cause") {
      const match = getMatchBy(user.uid, user.cause, "cause")

      //THIS IS WHERE YOU LEFT OFF BRUAH
    }

  }

  const cancelMatchConfirm = (e) => {
    e.stopPropagation()
    setMatchConfirmMessage(false)
    setShowMatchingOptions(true)
    setMatchUID('')
  }

  const matchDoubleConfirm = (e, uid, matchuid) => {
    e.stopPropagation()
    if (matchUID === '' && selectedUser.uid === user.uid) return alert('Please enter a UID or select a user')
    setMatchConfirmMessage(false)
    if (matchuid) return setMatch(uid, matchuid)
    setMatch(uid, selectedUser.uid)
  }

  const changeHandler = (e) => {
    e.stopPropagation()
    setMatchUID(e.target.value)
  }

  const collapsed =
    <div className={
      selectedUser ? selectedUser.uid === user.uid ? hovered === true ? "user-card user-selected hovered" : "user-card user-selected" : "user-card" : "user-card"} onClick={e => selectTheUser(e, user)}>
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

        <div className="card-btn-container">
          {
            user.simpaticoMatch
              ? <button onClick={e => removeMatch(e, user)} className='card-btn'>Remove match</button>
              : <button onClick={matchInputDisplaySwitch} className='card-btn'>Matching options</button>
          }
          <button className="card-btn" onClick={showDetailsDisplaySwitch}>Show Details</button>
        </div>

        {showMatchingOptions === true ?
          <div className="match-container" >
            <div className='matching-btns-container'>
              {/* <h5>Manual Matching options</h5> */}
              <div className='manual-matching-options'>
                <button
                  className='match-button'
                  useruid={user.uid}
                  onMouseEnter={e => showSelectedUser(e, true)}
                  onMouseLeave={e => showSelectedUser(e, false)}
                  onClick={e => matchConfirm(e)}> {!selectedUser || selectedUser.uid === user.uid ? "Select a user" : `Match with: ${selectedUser.displayName}`}
                </button>
                {/* <span>or</span>
                <div className="sub-container">
                  <input className="uid-input" type='text' placeholder='Enter UID'
                    onChange={changeHandler}></input>
                  <button className="uid-button" onClick={e => matchConfirm(e)}>Match</button>
                </div> */}
              </div>

              {toolTip ? <h5 className='tool-tip'>{toolTip}</h5> : <h5>Quick Matching options</h5>}
              <div className='quick-matching-options'>
                <button data-tooltip="cause"
                  onMouseEnter={e => setToolTip("Match by CAUSE")}
                  onMouseLeave={e => setToolTip("")}
                  onClick={e => matchConfirm(e)}
                >C</button>
                <button data-tooltip="kinship"
                  onMouseEnter={e => setToolTip("Match by KINSHIP")}
                  onMouseLeave={e => setToolTip("")}
                  onClick={e => matchConfirm(e)}
                >K</button>
                <button data-tooltip="both"
                  onMouseEnter={e => setToolTip("Match by KINSHIP & CAUSE")}
                  onMouseLeave={e => setToolTip("")}
                  onClick={e => matchConfirm(e)}
                >&</button>
                <button data-tooltip="none"
                  onMouseEnter={e => setToolTip("Match by NO MATCH")}
                  onMouseLeave={e => setToolTip("")}
                  onClick={e => matchConfirm(e)}
                >X</button>
              </div>
            </div>

          </div>
          : matchConfirmMessage === true ?
            <div className="match-container">
              <span className="match-confirm-message">Match this user with <strong>{selectedUser.displayName}</strong> ?</span>
              <div className="match-confirm-btns">
                <button className="match-button" onClick={e => matchDoubleConfirm(e, user.uid)}>Confirm</button>
                <button className="match-button" onClick={e => cancelMatchConfirm(e)}>Cancel</button>
              </div>
            </div>
            : null}
      </div>

    </div>

  const expanded =
    <div className={
      selectedUser ? selectedUser.uid === user.uid ? hovered === true ? "user-card user-selected hovered" : "user-card user-selected" : "user-card" : "user-card"} onClick={e => selectTheUser(e, user)}>
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

        <div className="card-btn-container">
          {
            user.simpaticoMatch
              ? <button onClick={e => removeMatch(e, user)} className='card-btn'>Remove match</button>
              : <button onClick={matchInputDisplaySwitch} className='card-btn'>Matching options</button>
          }
          <button className="card-btn" onClick={showDetailsDisplaySwitch}>Show Details</button>
        </div>
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
        {showMatchingOptions === true ?
          <div className="match-container" >
            <div className='matching-btns-container'>
              <h5>Manual Matching options</h5>
              <div className='manual-matching-options'>
                <button
                  className='match-button'
                  useruid={user.uid}
                  onMouseEnter={e => showSelectedUser(e, true)}
                  onMouseLeave={e => showSelectedUser(e, false)}
                  onClick={e => matchConfirm(e)}> {!selectedUser || selectedUser.uid === user.uid ? "Select a user" : `Match with: ${selectedUser.displayName}`}
                </button>
                <span>or</span>
                <div className="sub-container">
                  <input className="uid-input" type='text' placeholder='Enter UID'
                    onChange={changeHandler}></input>
                  <button className="uid-button" onClick={e => matchConfirm(e)}>Match</button>
                </div>
              </div>

              {toolTip ? <h5 className='tool-tip'>{toolTip}</h5> : <h5>Random Matching options</h5>}
              <div className='quick-matching-options'>
                <button data-tooltip="Match by CAUSE only"
                  onMouseEnter={e => setToolTip("Match by CAUSE")}
                  onMouseLeave={e => setToolTip("")}
                >C</button>
                <button data-tooltip="Match by KINSHIP only"
                  onMouseEnter={e => setToolTip("Match by KINSHIP")}
                  onMouseLeave={e => setToolTip("")}
                >K</button>
                <button data-tooltip="Match by KINSHIP and CAUSE"
                  onMouseEnter={e => setToolTip("Match by KINSHIP & CAUSE")}
                  onMouseLeave={e => setToolTip("")}
                >&</button>
                <button data-tooltip="Match by NO MATCH"
                  onMouseEnter={e => setToolTip("Match by NO MATCH")}
                  onMouseLeave={e => setToolTip("")}
                >X</button>
              </div>
            </div>

          </div>
          : matchConfirmMessage === true ?
            (!selectedUser && matchUID) || (user.uid === selectedUser.uid) ?
              <div className="match-container">
                <span className="match-confirm-message">Match this user with UID: {matchUID} ?</span>
                <div className="match-confirm-btns">
                  <button className="match-button" onClick={e => matchDoubleConfirm(e, user.uid, matchUID)}>Confirm</button>
                  <button className="match-button" onClick={e => cancelMatchConfirm(e)}>Cancel</button>
                </div>
              </div>

              : <div className="match-container">
                <span className="match-confirm-message">Match this user with <strong>{selectedUser.displayName}</strong> ?</span>
                <div className="match-confirm-btns">
                  <button className="match-button" onClick={e => matchDoubleConfirm(e, user.uid)}>Confirm</button>
                  <button className="match-button" onClick={e => cancelMatchConfirm(e)}>Cancel</button>
                </div>
              </div>
            : null}
      </div>

    </div>

  return (
    <div>
      {showDetails ? expanded : collapsed}
    </div>
  );
};
