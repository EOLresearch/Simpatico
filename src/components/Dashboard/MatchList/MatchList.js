import Match from './Match';
import './matchlist.css';

export default function MatchList({ currentUid, deceasedMatches, causeMatches, createConvo }) {
  
  function removeDuplicates(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j])
          a.splice(j--, 1);
      }
    }
    return a;
  }
  const combineMatches = [...deceasedMatches, ...causeMatches]
  const filterMeOut = combineMatches.filter(u => u.uid === currentUid ? null : u)
  const matchOnEither = removeDuplicates(filterMeOut)

  return (
    <div className='match-list-container'>
      <div className='intro-details'>
        <h3>Matched users</h3>
        <p>Right now, these matches are based on EITHER cause or kinship to the deceased </p>
      </div>
      {
        matchOnEither.map(user => {
          return (
            <Match key={user.uid} createConvo={createConvo} user={user} />
          )
        })
      }
    </div>
  );
}
