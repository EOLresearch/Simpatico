import React, { useEffect, useState } from 'react';
import DatabaseFilterContainer from './DatabaseFilterContainer'
import './userdatabase.css'


export default function UserDatabase({ firestore, users }) {
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)
  const [showKinshipFilters, setShowKinshipFilters] = useState(true)
  const [kinshipFilter, setKinshipFilter] = useState('All')
  const [causeFilter, setCauseFilter] = useState('All')
  const [filteredUsers, setFilteredUsers] = useState()

  useEffect(() => {
    if (!users) return

    const filteredUsers = users.filter(user => {
      if (causeFilter === 'All' && kinshipFilter === 'All') return user
      if (causeFilter === 'All' && kinshipFilter !== 'All') return user.kinship === kinshipFilter
      if (causeFilter !== 'All' && kinshipFilter === 'All') return user.cause === causeFilter
      if (causeFilter !== 'All' && kinshipFilter !== 'All') return user.cause === causeFilter && user.kinship === kinshipFilter
    }
    )
    setFilteredUsers(filteredUsers)

  }, [users, causeFilter, kinshipFilter])


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

  const filterHandler = (filterCondition) => {
    switch (filterCondition) {
      case 'All':
        setKinshipFilter('All')
        setCauseFilter('All')
        return
      case 'Natural':
        setCauseFilter('Natural')
        return
      case 'Unnatural':
        setCauseFilter('Unnatural')
        return
      case 'Kinship':
        setShowKinshipFilters(!showKinshipFilters)
        return
      case 'Partner':
        setKinshipFilter('Partner')
        return
      case 'Parent':
        setKinshipFilter('Parent')
        return
      case 'Offspring':
        setKinshipFilter('Offspring')
        return
      case 'Sibling':
        setKinshipFilter('Sibling')
        return
      case 'Cousin':
        setKinshipFilter('Cousin')
        return
      case 'Grandparent':
        setKinshipFilter('Grandparent')
        return
      case 'Grandchild':
        setKinshipFilter('Grandchild')
        return
      case 'Aunt':
        setKinshipFilter('Aunt')
        return
      case 'Uncle':
        setKinshipFilter('Uncle')
        return
      case 'Niece':
        setKinshipFilter('Niece')
        return
      case 'Nephew':
        setKinshipFilter('Nephew')
        return
      case 'Friend':
        setKinshipFilter('Friend')
        return
      case 'Other':
        setKinshipFilter('Other')
        return
      case 'I want to support others':
        setKinshipFilter('I want to support others')
        return
      default:
        console.log('switch default' + filterCondition)
        return
    }
  }

  return (
    <div className="user-database-container">
      <div className='admin-dashboard-nav'>
        <button onClick={e => filterHandler("All")}>All Users</button>
        <button onClick={e => filterHandler("Natural")} >Natural Causes</button>
        <button onClick={e => filterHandler("Unnatural")} >Unnatural Causes</button>
        <button onClick={e => filterHandler("Kinship")}>Kinship Filters</button>
      </div>
      <div className="user-database">
        {showKinshipFilters === true ? (
          <div className="kinship-selections">
            <div className='kinship-selections-header'>
              <button onClick={e => filterHandler("Kinship")}>X</button>
              <button onClick={e => filterHandler("All")}>All</button>
            </div>
            <div className='double-btn-container'>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Partner")}>Partner</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Parent")} >Parent</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Offspring")} >Offspring</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Sibling")} >Sibling</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Cousin")} >Cousin</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Grandparent")} >Grandparent</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Grandchild")} >Grandchild</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Aunt")} >Aunt</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Uncle")} >Uncle</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Niece")} >Niece</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Nephew")} >Nephew</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Friend")} >Friend</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Other")} >Other</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
              <div className='double-btn'>
                <span onClick={e => filterHandler("Support")} >I want to support others</span>
                <div className='sub-btn-container'>
                  <button>N</button><button>U</button>
                </div>
              </div>
            </div>



          </div>
        ) : null}
        {users ?
          <DatabaseFilterContainer
            users={filteredUsers}
            kinshipFilter={kinshipFilter}
            causeFilter={causeFilter}
            hovered={hovered}
            selectTheUser={selectTheUser}
            showSelectedUser={showSelectedUser}
            getMatchBy={getMatchBy}
            setSimpaticoMatch={setSimpaticoMatch}
            removeMatch={removeMatch}
          />
          : <p>loading...</p>}
      </div>
    </div>

  );
}

