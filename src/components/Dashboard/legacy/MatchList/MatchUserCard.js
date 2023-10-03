// MatchUserCard.js
import PropTypes from "prop-types";
import './matchlist.css';
import ConvoInvite from '../ConvoInvite/ConvoInvite';

function MatchUserCard({ user, getAge, fsUser, createConvo, setMessage, message, convo, convoMutualConsentToggle }) {
  return (
    <div className="display-card match ">
      <div className="display-card-container">
        <div className='left-col'>
          <img src={user.photoURL} alt="profile-avatar"></img>
          <p>{user.displayName}, {getAge(user.birthDate)}, {user.residence} </p>
        </div>
        <div className='right-col'>
          <h4>Story</h4>
          <p>{user.lossExp}</p>
        </div>
      </div>

      {convo ?
        convo.mutualConsent ?
          <div className='sent-request'>
            <p>You have an active conversation with {user.displayName}.</p>
            <p>See the conversations tab for the latest messages.</p>
          </div>
          :
          convo.userData.sender.uid === user.uid ?
            <ConvoInvite fsUser={user} convo={convo} convoMutualConsentToggle={convoMutualConsentToggle} createConvo={createConvo} />
            :
            <div className='sent-request'>
              <p>You have sent a chat request to {convo.userData.receiver.displayName}</p>
              <p>Check the conversations tab to see if they have responded.</p>
            </div>
        :
        <form onSubmit={e => createConvo(e, fsUser, message, user)} className="input-container-match">
          <label htmlFor="inputer">Send a supportive message to {user.displayName}</label>
          <input value={message} onChange={e => setMessage(e.target.value)} id="inputer" type="text" placeholder="Start a Conversation"></input>
          <button type='submit'><i className="fas fa-paper-plane"></i></button>
        </form>
      }
    </div>
  );
}

MatchUserCard.propTypes = {
  user: PropTypes.object.isRequired,
  getAge: PropTypes.func.isRequired,
  fsUser: PropTypes.object.isRequired,
  createConvo: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  convo: PropTypes.object,
  convoMutualConsentToggle: PropTypes.func.isRequired,
};
export default MatchUserCard;