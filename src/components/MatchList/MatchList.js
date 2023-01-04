import './matchlist.css';

export default function MatchList({ users }) {

  //a list of users who have been matched to the logged in user to chat with. 


  return (
    <div className='match-list-container'>
      <h3>Match list</h3>
      {
        users ?
          users.map(user => <p key={user.uid}>{user.displayName}</p>) : null
      }
    </div>
  );

}
