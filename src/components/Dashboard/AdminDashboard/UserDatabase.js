import React, { useState } from 'react';
import UserCard from './UserCard'
import './userdatabase.css'


export default function UserDatabase({ firestore, users, showAllUsers, showNatural, showUnnatural, showKinshipFilters }) {
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

  const kinshipFilterer = (e, kinship) => {
    switch (kinship) {
      case 'Partner':
        // setKinshipFilter('Partner')
        return
      case 'Grandparent':
        // setKinshipFilter('Grandparent')
        return
      case 'Parent':
        // setKinshipFilter('Parent')
        return
      case 'Offspring':
        // setKinshipFilter('Offspring')
        return
      case 'Sibling':
        // setKinshipFilter('Sibling')
        return
      case 'Cousin':
        // setKinshipFilter('Cousin')
        return
      case 'Grandchild':
        // setKinshipFilter('Grandchild')
        return
      case 'Aunt':
        // setKinshipFilter('Aunt')
        return
      case 'Uncle':
        // setKinshipFilter('Uncle')
        return
      case 'Niece':
        // setKinshipFilter('Niece')
        return
      case 'Nephew':
        // setKinshipFilter('Nephew')
        return
      case 'Friend':
        // setKinshipFilter('Friend')
        return
      case 'Other':
        // setKinshipFilter('Other')
        return
      case 'I want to support others':
        // setKinshipFilter('I want to support others')
        return
      default:
        console.log('switch default' + kinship)
        return
    }
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

  if (showNatural === true) {
    return (
      <div className="user-database">
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
    )
  }

  if (showUnnatural === true) {
    return (
      <div className="user-database">
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
    )
  }

  if (showKinshipFilters === true) {
    return (
      <div className="kinship-selections">

        <div className='double-btn'>
          <span>Partner</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Parent</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>

        <div className='double-btn'>
          <span>Offspring</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Sibling</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Cousin</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Grandparent</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Grandchild</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>

        <div className='double-btn'>
          <span>Aunt</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Uncle</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Niece</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Nephew</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Friend</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>Other</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
        <div className='double-btn'>
          <span>I want to support others</span>
          <div className='sub-btn-container'>
            <button>N</button><button>U</button>
          </div>
        </div>
      </div>
    )
  }
}
