import './matchlist.css';

export default function MatchList({ currentUid, users = [], convoHandler }) {

  const matches = users.filter(u => u.uid === currentUid ? null : u)
  
  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        matches.map(user => {
          return (
            <div key={user.uid} onClick={(e) => convoHandler(e, user)} className='match'>
              <p>{user.displayName}<br />{user.email}</p>
            </div>
          )
        })
      }
    </div>
  );
}
