import * as firebase from 'firebase';
import db from 'firebaseConfig';

//const db = firebase.database();

export function writeUserData(userId, firstName, lastName, userName, email){
    db.ref('users/' + userId).set({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email     
  });
}


