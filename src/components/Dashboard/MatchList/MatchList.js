import Match from './Match';
import './matchlist.css';
import { useState, useEffect } from "react";

export default function MatchList({ fsUser, matches, createConvo, convos }) {
  // matches need to know if they have a convo already and if it has mutualConsent ticked

  const [simpaticoMatches, setSimpaticoMatches] = useState([])

  useEffect(() => {
    if (!fsUser) return
    const causeNDeceased = matches.filter(match => match.cause === fsUser.cause && match.deceased === fsUser.deceased)
    const filterMeOut = causeNDeceased.filter(match => match.uid !== fsUser.uid)
    setSimpaticoMatches(filterMeOut)
  }, [fsUser, matches])


  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
      </div>
      <div className='match-list'>
        {
          simpaticoMatches.map((match, index) => {
            const convo = convos.find(c => c.docID === `${fsUser.uid} + ${match.uid}` || c.docID === `${match.uid} + ${fsUser.uid}`)
            return (
              <Match
                key={index}
                match={match}
                createConvo={createConvo}
                convo={convo}
              />
            )
          })
        }
      </div>
    </div>
  );
}
