import './welcomemessage.css';

function WelcomeMessage({ fsUser, match, navHandler }) {
  if (!fsUser) return null; // Return nothing if there's no user

  return (
    <div className="welcome-message">
      <div className='header'>
        {/* <h1>Welcome to SIMPATICO</h1> */}
        <div className='image-container'>
          <img className='profile-image' alt={`Profile of ${fsUser.displayName}`} src={fsUser.photoURL} />
        </div>
        <div className='header-text'>
          <p><strong>Hello, Charles</strong></p>
          <p>Thank you for joining <strong>SIMPATICO</strong>.</p>
        </div>
        <button onClick={e => navHandler('welcome')}>X</button>
      </div>

      <div className='body'>
        <p>This application is designed for you to create positive social interactions with others who have experienced a similar loss. We ask that you log in at least once a day to chat with your SIMPATICO match. You can see your personal details below and edit them as you wish.</p>
        <p>Our goal is to help you find someone who can relate to your loss. We hope that you will find comfort in sharing your story and listening to the stories of others. We are here to help you through your grief journey.</p>
        <div className='match-details'>
          {match
            ? <h4>You have been matched with {match.displayName}.</h4>
            : <p>You currently don't have a match. Hang tight!</p>
          }
        </div>
      </div>
    </div>
  );
}

export default WelcomeMessage;