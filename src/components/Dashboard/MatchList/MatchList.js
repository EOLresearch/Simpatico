import Match from './Match';
import './matchlist.css';
import { useState, useEffect } from "react";

export default function MatchList({ fsUser, matches = [], createConvo, convos = [], convoMutualConsentToggle }) {

  const [simpaticoMatches, setSimpaticoMatches] = useState([])

  useEffect(() => {
    if (fsUser === null) return
    const filterMeOut = matches.filter(match => match.uid !== fsUser.uid)
    setSimpaticoMatches(filterMeOut)
  }, [matches, fsUser])

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Your SIMPATICO Match</h3>
      </div>
      <div className='match-list'>
        { 
          matches.length === 1 || matches.length === 0 ?
          <div className='no-matches'>
            <h3>Sorry, you have not been matched yet</h3>
          </div>
          :
          simpaticoMatches.map((match, index) => {
            const convo = convos.find(c => c.docID === `${fsUser.uid} + ${match.uid}` || c.docID === `${match.uid} + ${fsUser.uid}`)
            return (
              <Match
                key={index}
                user={match}
                createConvo={createConvo}
                convo={convo}
                convoMutualConsentToggle={convoMutualConsentToggle}
              />
            )
          })
        }
      </div>
    </div>
  );
}
