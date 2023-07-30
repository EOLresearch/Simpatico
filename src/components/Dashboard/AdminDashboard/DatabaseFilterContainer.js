import UserCard from './UserCard'

export default function DatabaseFilterContainer({ users }) {


  return (
    <div className='database-filter-container'>
      {users ? users.map(user => {
        return (
          <UserCard
            key={user.uid}
            user={user}
          />
        )
      }
      ) : null}
    </div>
  );
}
