import './profile.css';

export default function Profile({ fsUser }) {

  return (
    <div>
      {
        fsUser ?
          fsUser.map(user => {
            return (
              <div className='profile-container'>
                <h4>Hello {user.displayName}</h4>
                <p>
                  Email: {user.email}<br />
                  
                </p>
              </div>
            )
          }) 
        : <p>User Not Found</p>
      }
    </div>
  );

}
