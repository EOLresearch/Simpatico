import './matchlist.css';

export default function MatchList({ currentUid, users = [], convoHandler }) {

  const matches = users.filter(u => u.uid === currentUid ? null : u)
  
  return (
    <div className='match-list-container'>
      <h3>Matched users</h3>
      <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
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
