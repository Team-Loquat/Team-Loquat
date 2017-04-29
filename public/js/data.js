import * as firebase from 'firebase';
import {
  db as firebaseDB
} from 'firebaseConfig';

//const db = firebase.database();

// export function writeUserData(userId, firstName, lastName, userName, email) {
//   db.ref('users/' + userId).set({
//     firstName: firstName,
//     lastName: lastName,
//     userName: userName,
//     email: email
//   });
// }


const defaultRef = firebaseDB.ref('data/');
const usersRef = defaultRef.child('users');

export function addNewUserToDatabase(firstName, lastName, userName, password, email) {

  const user = {
    userName: {
      firstName,
      lastName,      
      password,
      email
    }
  };
 

  return new Promise((resolve, reject) => {
    usersRef.push(user);
  });
}