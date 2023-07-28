import React, { useState } from 'react';
import UserCard from './UserCard'
import './userdatabase.css'


export default function UserDatabase({ firestore, users }) {
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)

  const [showAllUsers, setShowAllUsers] = useState(true)
  const [showNatural, setShowNatural] = useState(false)
  const [showUnnatural, setShowUnnatural] = useState(false)
  const [showKinshipFilters, setShowKinshipFilters] = useState(false)
  const [kinshipFilter, setKinshipFilter] = useState('')

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

  const subNavHandler = (renderCondition) => {
    switch (renderCondition) {
      case 'All':
        setShowAllUsers(true)
        setShowNatural(false)
        setShowUnnatural(false)
        setShowKinshipFilters(false)
        return
      case 'Natural':
        setShowAllUsers(false)
        setShowNatural(true)
        setShowUnnatural(false)
        setShowKinshipFilters(false)
        return
      case 'Unnatural':
        setShowAllUsers(false)
        setShowNatural(false)
        setShowUnnatural(true)
        setShowKinshipFilters(false)
        return
      case 'Kinship':
        setShowKinshipFilters(!showKinshipFilters)
        return
      default:
        console.log('switch default' + renderCondition)
        return
    }
  }

  //leaving off here incomplete for the day. 
  //trying to get the filters working in a way that the kinship filters will also work 
  //creating a new container component under this one to the user-db-body
  //proably renaming this component to something more descriptive which will go with the lower container that will filter the users based on the filters. 
  

  return (
    <div className="user-database-container">
      <div className='admin-dashboard-nav'>
        <button onClick={e => subNavHandler("All")}>All Users</button>
        <button onClick={e => subNavHandler("Natural")} >Natural Causes</button>
        <button onClick={e => subNavHandler("Unnatural")} >Unnatural Causes</button>
        <button onClick={e => subNavHandler("Kinship")}>Kinship Filters</button>
      </div>
      <div className="user-database">
        {showKinshipFilters === true ? (
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
        ) : null}
        {users ? null : <p>loading...</p>}
      </div>
    </div>

  );
}

