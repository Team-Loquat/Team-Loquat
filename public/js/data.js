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
    var timestamp = new Date();
    timestamp = timestamp.getTime();
    var collectionData = {
        uid: firebase.auth().currentUser.uid,
        items: items,
        colType: type,
        description: description,
        isPrivate: true,
        timestamp: timestamp,
        author: firebase.auth().currentUser.email
    };

    var newCollectionKey = firebase.database().ref().child('collections').push().key;

    var updates = {};
    updates['/collections/' + newCollectionKey] = collectionData;

    return firebase.database().ref().update(updates);
}

function getMyItems( onSuccess, onError ) {
    const myId = firebase.auth().currentUser.uid;
    const items = [];
    const query = firebase.database().ref("items").orderByChild("uid").equalTo( myId );
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const childData = childSnapshot.val();
                items.push( {
                    image: childData.image,
                    href: childData.href,
                    description: childData.description,
                    rating : childData.rating
                })
            });
            if (onSuccess) {
                onSuccess(items);
            }
        })
        .catch( (error) => {
            if (onError) {
                onError( error );
            } else {
                console.log(error);
            }
        });
}

function getMyCollections( onSuccess, onError ) {
    const myId = firebase.auth().currentUser.uid;
    const collections = [];
    const query = firebase.database().ref("collections").orderByChild("uid").equalTo( myId );
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var items = [];
                const itemPromises = [];
                const references = childData.items;
                for (let i = 0, len = references.length; i < len; i += 1) {
                    const reference = "/items/" + references[i];
                    const itemPromise = firebase.database().ref(reference);
                    itemPromise.once("value").
                        then( (snapshot) => {
                            const item = snapshot.val();
                            if (!item) {
                                return;
                            }
                            items.push({
                                image: item.image,
                                href: item.href,
                                description: item.description,
                                rating: item.rating
                            });
                        } );
                    itemPromises.push( itemPromise );
                }
                Promise.all( itemPromises ).then( () => {
                    collections.push({
                        items: items,
                        colType: childData.colType,
                        description: childData.description,
                        isPrivate: childData.isPrivate,
                        timestamp: childData.timestamp
                    })
                })
            });
            if (onSuccess) {
                onSuccess(collections);
            }
        })
        .catch( (error) => {
            if (onError) {
                onError( error );
            } else {
                console.log(error);
            }
        });
}

function getAllCollections( onSuccess, onError ) {
    const myId = firebase.auth().currentUser.uid;
    const collections = [];
    const query = firebase.database().ref("collections");
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.uid != myId && childData.isPrivate) {
                    return;
                }
                var items = [];
                const itemPromises = [];
                const references = childData.items;
                for (let i = 0, len = references.length; i < len; i += 1) {
                    const reference = "/items/" + references[i];
                    const itemPromise = firebase.database().ref(reference);
                    itemPromise.once("value").
                        then((snapshot) => {
                            const item = snapshot.val();
                            if (!item) {
                                return;
                            }
                            items.push({
                                image: item.image,
                                href: item.href,
                                description: item.description,
                                rating: item.rating
                            });
                        });
                    itemPromises.push(itemPromise);
                }
                Promise.all(itemPromises)
                    .then(() => {
                        collections.push({
                            items: items,
                            colType: childData.colType,
                            description: childData.description,
                            isPrivate: childData.isPrivate,
                            timestamp: childData.timestamp,
                            author: author
                        })

                    })
                    .catch((error) => {
                        if (onError) {
                            onError(error);
                        } else {
                            console.log(error);
                        }
                    })
            });
            if (onSuccess) {
                onSuccess(collections);
            }
        })
        .catch( (error) => {
            if (onError) {
                onError( error );
            } else {
                console.log(error);
            }
        });
}

export {
    writeNewItem,
    writeNewCollection,
    getMyItems,
    getMyCollections,
    getAllCollections,
    };