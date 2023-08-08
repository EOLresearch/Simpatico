import './profile.css';
import PropTypes from 'prop-types';
import { useState } from "react";
import { IconContext } from "react-icons";
import { RiUserSettingsLine } from "react-icons/ri";

function Profile({ fsUser, updateFsUser, navHandler }) {
  const [editUserDetails, setEditUserDetails] = useState(false);

  const userDetailsHandler = (boolean) => {
    setEditUserDetails(boolean);
  };

  return (
    <IconContext.Provider value={{ className: "react-icons-profile" }}>
      {fsUser && (
        <div className='profile-container'>
          <div className='display-card'>
            <div className='image-container'>
              <img className='profile-image' alt={`Profile of ${fsUser.displayName}`} src={fsUser.photoURL} />
            </div>
            <div className='profile-body'>
              <p><strong>Hello, {fsUser.displayName}.</strong></p>
              <div className='body'>
                <p>Thank you for joining <strong>SIMPATICO</strong>.</p>
                <p>This application is designed for you to create positive social interactions with others who have experienced a similar loss. We ask that you log in at least once a day to chat with your SIMPATICO match. You can see your personal details below and edit them as you wish.</p>
                <p>Our goal is to help you find someone who can relate to your loss. We hope that you will find comfort in sharing your story and listening to the stories of others. We are here to help you through your grief journey.</p>
                <div className='edit-user-details' onClick={() => userDetailsHandler(true)}>
                  <p className='profile-btn'><RiUserSettingsLine /> <span>View and Edit user details</span> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </IconContext.Provider>
  );
}

Profile.propTypes = {
  fsUser: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string
  }),
  updateFsUser: PropTypes.func.isRequired,
  navHandler: PropTypes.func.isRequired
};

export default Profile;

