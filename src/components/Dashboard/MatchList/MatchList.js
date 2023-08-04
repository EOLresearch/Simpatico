import Match from './Match';
import './matchlist.css';
import { useState, useEffect } from "react";
import { firestore } from '../../../firebase-config'

export default function MatchList({ fsUser, match, createConvo, convoMutualConsentToggle }) {


  const [convo, setConvo] = useState();

  useEffect(() => {
    const fetchConvos = async () => {
      if (!fsUser) return;

      const convosRef = firestore.collection('conversations');
      const convoQuery = convosRef.where('users', 'array-contains', fsUser.uid);

      try {
        const convoSnapshot = await convoQuery.get();

        if (!convoSnapshot.empty) {
          const convoData = convoSnapshot.docs.map(doc => doc.data());
          // const convo = convos.find(c => c.docID === `${fsUser.uid} + ${match.uid}` || c.docID === `${match.uid} + ${fsUser.uid}`) If there are multiples BUT THERE IS CURRENTLY ONLY ONE          // setConvo(convoData);
          setConvo(convoData[0]);
        }
      } catch (error) {
        console.log('Error getting documents: ', error);
      }
    };

    fetchConvos();
  }, [fsUser]);

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
            <Match
              fsUser={fsUser}
              key={match.uid}
              user={match}
              createConvo={createConvo}
              convo={convo}
              convoMutualConsentToggle={convoMutualConsentToggle}
            />
        }
      </div>
    </div>
  );
}
