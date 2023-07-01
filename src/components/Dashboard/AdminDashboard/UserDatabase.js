
import UserCard from './UserCard'


export default function UserDatabase({ users, setMatch, selectTheUser, selectedUser, showSelectedUser, hovered, removeMatch }) {


  return (
    <div className="user-database">
      { users? users.map(user => (
        <UserCard key={user.uid}
          user={user}
          setMatch={setMatch}
          selectTheUser={selectTheUser}
          selectedUser={selectedUser}
          showSelectedUser={showSelectedUser}
          hovered={hovered}
          removeMatch={removeMatch} />
      )) : <p>loading...</p>}
    </div>

  );
}
