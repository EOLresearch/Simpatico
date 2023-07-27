import React, { useState } from 'react';
import UserCard from './UserCard'
import './userdatabase.css'


export default function UserDatabase({ firestore, users, showAllUsers, showCauseMatches, showKinshipMatches }) {
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)

  const selectTheUser = (e, user) => {
    setSelectedUser(user)
  }

  const showSelectedUser = (e, boolean) => {
    e.stopPropagation()
    if (e.target.attributes.useruid.value === selectedUser) return
    setHovered(boolean)
  }

  const getMatchBy = (uid, userCause, userKinship, type) => {
    console.log(type)
    const unmatchedUsers = users.filter(user => user.simpaticoMatch === '')

    if (type === 'cause') {
      const match = unmatchedUsers.find(user => user.cause === userCause && user.uid !== uid)
      if (!match) return alert('no match available')
      setSelectedUser(match)
    } else if (type === 'kinship') {
      const match = unmatchedUsers.find(user => user.kinship === userKinship && user.uid !== uid)
      if (!match) return alert('no match available')
      setSelectedUser(match)
    } else if (type === 'both') {
      const match = unmatchedUsers.find(user => user.cause === userCause && user.kinship === userKinship && user.uid !== uid)
      if (!match) return alert('no match available')
      setSelectedUser(match)
    } else if (type === 'none') {
      const match = unmatchedUsers.find(user => user.cause !== userCause && user.kinship !== userKinship && user.uid !== uid)
      if (!match) return alert('no match available')
      setSelectedUser(match)
      console.log(match)
    }
  }

  const setSimpaticoMatch = (useruid, selecteduid) => {
    console.log(useruid)
    console.log(selecteduid)

    const userRef = firestore.collection('users').doc(useruid);
    const selectedRef = firestore.collection('users').doc(selecteduid);

    userRef.update({
      simpaticoMatch: selecteduid
    })

    selectedRef.update({
      simpaticoMatch: useruid
    })
    setHovered(false)
  }

  const removeMatch = (e, user) => {
    const userRef = firestore.collection('users').doc(user.uid);
    const matchRef = firestore.collection('users').doc(user.simpaticoMatch);
    userRef.update({
      simpaticoMatch: ''
    })
    matchRef.update({
      simpaticoMatch: ''
    })
    setHovered(false)
  }

  if (showAllUsers === true) {
    return (
      <div className="user-database">
        {users ? users.map(user => (
          <UserCard key={user.uid}
            user={user}
            setSimpaticoMatch={setSimpaticoMatch}
            getMatchBy={getMatchBy}
            selectTheUser={selectTheUser}
            selectedUser={selectedUser}
            showSelectedUser={showSelectedUser}
            hovered={hovered}
            removeMatch={removeMatch} />
        )) : <p>loading...</p>}
      </div>
    );
  }

  if (showCauseMatches === true) {

    return (
      <div className="user-database-columns">
        <div className='cause-column natural-causes'>
          <h2>Natural</h2>
          {users ? users.map(user => (
            user.cause === 'Natural' ? <UserCard key={user.uid}
              user={user}
              setSimpaticoMatch={setSimpaticoMatch}
              getMatchBy={getMatchBy}
              selectTheUser={selectTheUser}
              selectedUser={selectedUser}
              showSelectedUser={showSelectedUser}
              hovered={hovered}
              removeMatch={removeMatch} /> : null
          )) : <p>loading...</p>}
        </div>
        <div className='cause-column unnatural-causes'>
          <h2>Unnatural</h2>
          {users ? users.map(user => (
            user.cause === 'Unnatural' ? <UserCard key={user.uid}
              user={user}
              setSimpaticoMatch={setSimpaticoMatch}
              getMatchBy={getMatchBy}
              selectTheUser={selectTheUser}
              selectedUser={selectedUser}
              showSelectedUser={showSelectedUser}
              hovered={hovered}
              removeMatch={removeMatch} /> : null
          )) : <p>loading...</p>}

        </div>
      </div>
    )

  }

  if (showKinshipMatches === true) {
    return (
      <div className="kinship-selections">
        <div className='kinship-column'>
          <button>Partner</button>
          <button>Grandparent</button>
          <button>Parent</button>
          <button>Offspring</button>
          <button>Sibling</button>
          <button>Cousin</button>
          <button>Grandchild</button>
        </div>
        <div className='kinship-column'>
          <button>Aunt</button>
          <button>Uncle</button>
          <button>Niece</button>
          <button>Nephew</button>
          <button>Friend</button>
          <button>Other</button>
          <button>I want to support others</button>
        </div>
      </div>
    )
  }
}
