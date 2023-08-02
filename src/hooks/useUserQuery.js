import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firestore = firebase.firestore();

const useUserQuery = (user) => {
  const [fsUser, setFsUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    const usersRef = firestore.collection('users');
    const userQuery = usersRef.where('email', '==', user.email);

    userQuery.get().then((querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        console.log('1 Doc Read');
        dataArr.push(doc.data());
      });
      setFsUser(dataArr[0]);
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }, [user]);

  return fsUser;
};

export default useUserQuery;
