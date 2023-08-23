import React, { useEffect, useState } from 'react';
import UserCardFilterContainer from './UserCardFilterContainer/UserCardFilterContainer'
import './userdisplay.css'
import { updateSimpaticoMatch, removeSimpaticoMatch } from '../../../../helpers/firebaseHelpers';
import PropTypes from 'prop-types';

import { KINSHIP_OPTIONS } from '../../../../helpers/optionsArrays';

const filterUsers = (users, causeFilter, kinshipFilter) => {
  if (!users) return [];

  return users.filter(user => {
    if (causeFilter === 'All' && kinshipFilter === 'All') return true;
    if (causeFilter === 'All' && kinshipFilter !== 'All') return user.kinship === kinshipFilter;
    if (causeFilter !== 'All' && kinshipFilter === 'All') return user.cause === causeFilter;
    return user.cause === causeFilter && user.kinship === kinshipFilter;
  });
}

function UserDisplay({ view, users }) {
  const [selectedUser, setSelectedUser] = useState()
  const [hovered, setHovered] = useState(false)
  const [showKinshipFilters, setShowKinshipFilters] = useState(true)
  const [kinshipFilter, setKinshipFilter] = useState('All')
  const [causeFilter, setCauseFilter] = useState('All')
  const [filteredUsers, setFilteredUsers] = useState(filterUsers(users, causeFilter, kinshipFilter))

  useEffect(() => {
    setFilteredUsers(filterUsers(users, causeFilter, kinshipFilter))
  }, [users, causeFilter, kinshipFilter])


  const selectTheUser = (user) => {
    setSelectedUser(user)
  }

  const showSelectedUser = (e, boolean) => {
    e.stopPropagation()
    if (e.target.attributes.useruid.value === selectedUser) return
    setHovered(boolean)
  }

  const getMatchBy = (uid, userCause, userKinship, type) => {
    const unmatchedUsers = users.filter(user => user.simpaticoMatch === '');
    let predicate;

    switch (type) {
      case 'cause':
        predicate = user => user.cause === userCause && user.uid !== uid;
        break;
      case 'kinship':
        predicate = user => user.kinship === userKinship && user.uid !== uid;
        break;
      case 'both':
        predicate = user => user.cause === userCause && user.kinship === userKinship && user.uid !== uid;
        break;
      case 'none':
        predicate = user => user.cause !== userCause && user.kinship !== userKinship && user.uid !== uid;
        break;
      default:
        return;
    }

    const match = unmatchedUsers.find(predicate);
    if (!match) return alert('no match available')
    setSelectedUser(match)
  }

  const setSimpaticoMatch = async (useruid, selecteduid) => {
    try {
      await Promise.all([
        updateSimpaticoMatch(useruid, selecteduid),
        updateSimpaticoMatch(selecteduid, useruid)
      ]);
      setHovered(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const removeMatch = async (user) => {
    try {
      await Promise.all([
        removeSimpaticoMatch(user.uid),
        removeSimpaticoMatch(user.simpaticoMatch)
      ]);
      setHovered(false)
    } catch (err) {
      console.log(err.message)

    }
  }

  const filterHandler = (filterCondition) => {
    const filterOptions = {
      'All': () => {
        setKinshipFilter('All');
        setCauseFilter('All');
      },
      'Natural': () => setCauseFilter('Natural'),
      'Unnatural': () => setCauseFilter('Unnatural'),
      'Kinship': () => setShowKinshipFilters(prevState => !prevState),
      default: () => setKinshipFilter(filterCondition)
    };

    // Call the matching filter function with condition or default
    (filterOptions[filterCondition] || filterOptions.default)();
  }


  return (
    <div className="user-display-container">
      <div className='user-display-header'>
        <div className='user-display-cause-selections'>
          {['Kinship', 'Natural', 'Unnatural', 'All'].map(filter =>
            <button key={filter} onClick={() => { filterHandler(filter); setKinshipFilter('All'); }}>
              {filter === 'Kinship' ? showKinshipFilters ? 'X' : '_' : filter}
            </button>
          )}
        </div>
      </div>
      <div className="user-display-body">
        {showKinshipFilters && (
          <div className="kinship-selections">
            <div className='double-btn-container'>
              <div className='filter-labels'>
                {/* <span>Current Filters:</span> */}
                <div className='filter-labels-container'>
                  <span>Cause: <span>{causeFilter}</span> </span>
                  <span>Kinship: <span>{kinshipFilter}</span></span>
                </div>
              </div>
              {KINSHIP_OPTIONS.map(kinship => (
                <div key={kinship} className='double-btn'>
                  <span onClick={() => filterHandler(kinship)}>{kinship}</span>
                  <div className='sub-btn-container'>
                    <button onClick={() => { setCauseFilter('Natural'); setKinshipFilter(kinship); }}>N</button>
                    <button onClick={() => { setCauseFilter('Unnatural'); setKinshipFilter(kinship); }}>U</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {users ?
          <UserCardFilterContainer
            users={filteredUsers}
            hovered={hovered}
            selectTheUser={selectTheUser}
            showSelectedUser={showSelectedUser}
            getMatchBy={getMatchBy}
            setSimpaticoMatch={setSimpaticoMatch}
            removeMatch={removeMatch}
            selectedUser={selectedUser}
          />
          : <p>loading...</p>}
      </div>
    </div>
  );
}

UserDisplay.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    simpaticoMatch: PropTypes.string.isRequired,
    cause: PropTypes.string.isRequired,
    kinship: PropTypes.string.isRequired,
  })),
};

export default UserDisplay;