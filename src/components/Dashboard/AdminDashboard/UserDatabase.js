import React, { useState } from 'react';
import UserCard from './UserCard'
import './userdatabase.css'


export default function UserDatabase({ firestore, users }) {
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
      setSelectedUser(match)
    } else if (type === 'kinship') {
      const match = unmatchedUsers.find(user => user.kinship === userKinship && user.uid !== uid)
      setSelectedUser(match)
    } else if (type === 'both') {
      const match = unmatchedUsers.find(user => user.cause === userCause && user.kinship === userKinship && user.uid !== uid)
      setSelectedUser(match)
    } else if (type === 'none') {
      const match = unmatchedUsers.map(user => {
        const excludeThisUser = unmatchedUsers.filter(user => user.uid !== uid)
        const noCauseMatches = excludeThisUser.filter(user => user.cause !== userCause)
        const noKinshipMatches = noCauseMatches.filter(user => user.kinship !== userKinship)
        return noKinshipMatches[Math.floor(Math.random() * noKinshipMatches.length)]
      })
      // setSelectedUser(match)
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

  return (
    <div className="user-database">
      { users ? users.map(user => (
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
