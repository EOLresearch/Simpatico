import './matchlist.css';
import { useState } from "react";
import PropTypes from 'prop-types';
import MatchUserCard from './MatchUserCard';

function getAge(date) {
  const today = new Date();
  const bday = new Date(date);
  let age = today.getFullYear() - bday.getFullYear();
  let m = today.getMonth() - bday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
    age--;
  }
  return age;
}

function Match({ fsUser, user, createConvo, convo, convoMutualConsentToggle }) {
  const [message, setMessage] = useState('');

  return (
    <MatchUserCard 
      user={user} 
      getAge={getAge} 
      fsUser={fsUser} 
      createConvo={createConvo} 
      setMessage={setMessage} 
      message={message} 
      convo={convo} 
      convoMutualConsentToggle={convoMutualConsentToggle} 
    />
  );
}

Match.propTypes = {
  fsUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  createConvo: PropTypes.func.isRequired,
  convo: PropTypes.object,
  convoMutualConsentToggle: PropTypes.func.isRequired,
};

Match.defaultProps = {
  convo: null,  // Default value
};

export default Match;
