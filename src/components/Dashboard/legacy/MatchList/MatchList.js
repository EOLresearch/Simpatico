import './matchlist.css';
import PropTypes from 'prop-types';
import Match from './Match';

function MatchList({ fsUser, match, convos, createConvo, convoMutualConsentToggle }) {

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Your SIMPATICO Match</h3>
      </div>
      <div className='match-list'>
        {
          !match ?
            <div className='no-matches'>
              <h3>Sorry, you have not been matched yet</h3>
            </div>
            :
            convos &&
            <Match
              fsUser={fsUser}
              key={match.uid}
              user={match}
              createConvo={createConvo}
              convo={convos.find(c => c.docID === `${fsUser.uid} + ${match.uid}` || c.docID === `${match.uid} + ${fsUser.uid}`) }
              convoMutualConsentToggle={convoMutualConsentToggle}
            />
        }
      </div>
    </div>
  );
}

MatchList.propTypes = {
  fsUser: PropTypes.object.isRequired,
  match: PropTypes.object,
  convos: PropTypes.array.isRequired,
  createConvo: PropTypes.func.isRequired,
  convoMutualConsentToggle: PropTypes.func.isRequired,
};

export default MatchList;
