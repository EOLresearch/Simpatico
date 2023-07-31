import UserCard from './UserCard'

export default function DatabaseFilterContainer( props ) {

  //naming note - this is more of a user card fitlererer or container or osmethign liek that - it's not a database filter container
const {
  users,
  selectedUser,
  // kinshipFilter,
  // causeFilter,
  hovered,
  selectTheUser,
  showSelectedUser,
  getMatchBy,
  setSimpaticoMatch,
  removeMatch} = props

return (
  <div className='database-filter-container'>
    {users ? users.map(user => {
      return (
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
      )
    }
    ) : null}
  </div>
);
}
