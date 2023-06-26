import React, { useState } from 'react';



export default function UserCard({ user }) {
  const [showDetails, setShowDetails] = useState(false);

  const collapsed =
    <div className="user-card">
      <div className="card-header">
        <h3>{user.displayName}</h3>

        {
          user.simpaticoMatch ?
            <div className="matched">
              <span className="card-label">Matched</span>
            </div>
            :

            <div className="not-matched">
              <span className="card-label">Not Matched</span>
            </div>
        }
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

        <button className="card-btn" onClick={() => setShowDetails(true)}>Show Details</button>
      </div>
    </div>

    const exp = 
    <div className="user-card">
    <div className="card-header">
      <h3>{user.displayName}</h3>

      {
        user.simpaticoMatch ?
          <div className="matched">
            <span className="card-label">Matched</span>
          </div>
          :

          <div className="not-matched">
            <span className="card-label">Not Matched</span>
          </div>
      }
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

        <button className="card-btn" onClick={() => setShowDetails(false)}>Hide Details</button>

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
          <div className="card-row">
            <span className="card-label">UID:</span>
            <span>{user.uid}</span>
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
