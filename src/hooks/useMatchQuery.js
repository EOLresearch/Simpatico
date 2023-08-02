import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firestore = firebase.firestore();

const useMatchQuery = (fsUser) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!fsUser) return;
    const usersRef = firestore.collection('users');
    const matchQuery = usersRef.where('cause', '==', fsUser.cause).where('kinship', '==', fsUser.kinship);

    matchQuery.get().then((querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        console.log('1 Doc Read');
        dataArr.push(doc.data());
      });
      setMatches(dataArr);
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }, [fsUser]);

  return matches;
};

export default useMatchQuery;
