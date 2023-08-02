import React from 'react';
import UserCard from './UserCard/UserCard';
import './usercardfiltercontainer.css'

function UserCardFilterContainer({ users, selectedUser, hovered, selectTheUser, showSelectedUser, getMatchBy, setSimpaticoMatch, removeMatch }) {
  return (
    <div className='database-filter-container'>
      {users && users.map(user => (
        <UserCard
          key={user.uid}
          user={user}
          hovered={hovered}
          selectTheUser={selectTheUser}
          showSelectedUser={showSelectedUser}
          getMatchBy={getMatchBy}
          setSimpaticoMatch={setSimpaticoMatch}
          removeMatch={removeMatch}
          selectedUser={selectedUser}
        />
      ))}
    </div>
  );
}

export default UserCardFilterContainer;
