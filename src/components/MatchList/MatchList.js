import './matchlist.css';

export default function MatchList({ currentUid, users = [], convoHandler }) {

  const matches = users.filter(u => u.uid === currentUid ? null : u)
  
  return (
    <div className='match-list-container'>
      <h3>Matched users</h3>
      <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."</p>
      {
        matches.map(user => {
          return (
            <div key={user.uid} onClick={(e) => convoHandler(e, user)} className='match'>
              <img src={user.photoURL}></img>
              <p>{user.displayName}<br />{user.email}</p>
            </div>
          )
        })
      }
    </div>
  );
}
