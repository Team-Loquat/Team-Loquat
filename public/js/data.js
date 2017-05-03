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

//export function addNewUserToDatabase(id) {
//  const user = {};
//  user[id] = {
//    test: 'test'
//  };
//
//  return new Promise((resolve, reject) => {
//    usersRef.push(user);
//  });
//}

function writeNewItem( image, href, description ) {
  var itemData = {
    uid: firebase.auth().currentUser.uid,
    image: image,
    href: href,
    description: description,
    rating : 0
  };

  var newItemKey = firebase.database().ref().child('items').push().key;

  var updates = {};
  updates['/items/' + newItemKey] = itemData;

  return firebase.database().ref().update(updates);
}

function writeNewCollection( items, type, description ) {
    var collectionData = {
        uid: firebase.auth().currentUser.uid,
        items: items,
        type: type,
        description: description,
        isPrivate: true
    };

    var newCollectionKey = firebase.database().ref().child('collections').push().key;

    var updates = {};
    updates['/collections/' + newCollectionKey] = collectionData;

    return firebase.database().ref().update(updates);
}


export {
    writeNewItem,
    writeNewCollection
    };