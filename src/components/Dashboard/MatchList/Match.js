import './matchlist.css';
import { useState } from "react";
import MatchUserCard from './MatchUserCard';

function Match({ fsUser, user, createConvo, convo, convoMutualConsentToggle }) {
  const [message, setMessage] = useState('')

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
export default Match