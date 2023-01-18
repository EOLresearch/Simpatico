import './nav.css';

export default function Nav({ fsUser }) {

  return (
    <div className='nav-container'>
      {
        fsUser ?
          fsUser.map(user => {
            return (
              <div key={user.uid} className="profile" >
                <h4>Hi {user.displayName}</h4>
                
              </div>
            )
          }) 
        : <p>User Not Found</p>
      }
      <div className='nav-body'>
        <ul>
          <li>My Story</li>
          <li>My Details</li>
          <li>Matches</li>
          <li>Conversations</li>
        </ul>
      </div>
    </div>
  );

}
