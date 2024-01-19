import React from 'react';

const MatchCard = ({contact, navha}) => {
  return (
    <div className="matchcard-container">
      <div className='header'>
        {/* <h1>Welcome to SIMPATICO</h1> */}
        <div className='image-container'>
          <img className='profile-image' alt={`Profile of ${contact.displayName}`} src={contact.photoURL} />
        </div>
        <div className='header-text'>
          <p><strong>Brian Crenshaw</strong></p>
          <p>Lives in Kansas, 44 years old</p>
        </div>
      </div>

      <div className='body'>
        <p>Brians story:</p>
        <p>This application is designed for you to create positive social interactions with others who have experienced a similar loss. We ask that you log in at least once a day to chat with your SIMPATICO match. You can see your personal details below and edit them as you wish.</p>
        <p>Our goal is to help you find someone who can relate to your loss. We hope that you will find comfort in sharing your story and listening to the stories of others. We are here to help you through your grief journey.</p>
        <div className='match-details'>
          <h4>Brian is sharing all of his information with you</h4>
        </div>
      </div>
    </div>
  );
};

export default MatchCard; 
