import * as firebase from 'firebase';
import {
  db as firebaseDB
} from 'firebaseConfig';
import Validator from 'validator';


const defaultRef = firebaseDB.ref('data/');
const usersRef = defaultRef.child('users'); 

function writeNewItem(collectionId, name, href, description ) {
     const _name = name || '';
     const _href = href || '';
     const _description = description || '';
     var itemData = {
         uid: firebase.auth().currentUser.uid,
         name: _name,
         href: _href,
         description: _description          
     };

     var newItemKey = firebase.database().ref().child('items').push().key;

     var updates = {};
     updates['/items/' + newItemKey] = itemData;

     return new Promise( ( resolve, reject ) => {
         firebase.database().ref().update(updates)
             .then( () => {
                 const collectionRef = firebase.database().ref('collections/' + collectionId );
                 collectionRef.once("value")
                     .then((snapshot) => {
                         const collection = snapshot.val();
                         collection.items.push( newItemKey );
                         collectionRef.set( collection )
                            .then( (result) => resolve(result) )
                            .catch( (error) => reject(error) );
                     })
                 .catch( (error) => reject(error) )
             })
         .catch( (error) => reject(error) );
     })
 }

function writeNewCollection( items, type, description, isPrivate ) {
     const _items = items || [];
     if (_items.length === 0 ) {
         _items.push( 'init' );
     }
     const _type = type || '';
     const _description = description || '';
     const _isPrivate = isPrivate == true;
     var timestamp = new Date();
     timestamp = timestamp.getTime();
     var collectionData = {
         uid: firebase.auth().currentUser.uid,
         items: _items,
         colType: _type,
         description: _description,
         isPrivate: _isPrivate,
         timestamp: timestamp,
         author: firebase.auth().currentUser.email.split('@')[0]
     };

     var newCollectionKey = firebase.database().ref().child('collections').push().key;

     var updates = {};
     updates['/collections/' + newCollectionKey] = collectionData;

     return firebase.database().ref().update(updates);
 }

function getMyItems() {
     const myId = firebase.auth().currentUser.uid;
     const items = [];
     const query = firebase.database().ref("items").orderByChild("uid").equalTo( myId );
     return new Promise( (resolve, reject) => {
         query.once("value")
             .then(function (snapshot) {
                 snapshot.forEach(function (childSnapshot) {
                     const childData = childSnapshot.val();
                     items.push({
                         key: childSnapshot.key,
                         name: childData.name,
                         href: childData.href,
                         description: childData.description,
                         rating: childData.rating
                     })
                 });
                 resolve(items);
             })
             .catch((error) => reject(error));
     });
 }

function getMyCollections() {
     const myId = firebase.auth().currentUser.uid;
     const collections = [];
     const query = firebase.database().ref("collections").orderByChild("uid").equalTo( myId );
     const colPromises = [];
     return new Promise( (resolve, reject) => {
         query.once("value")
             .then(function (snapshot) {
                 snapshot.forEach(function (childSnapshot) {
                     var childData = childSnapshot.val();
                     var items = [];
                     const itemPromises = [];
                     let references = childData.items;
                     if (!references) {
                         references = [];
                     }
                     for (let i = 0, len = references.length; i < len; i += 1) {
                         if (references[i] === 'init') {
                             continue;
                         }
                         const reference = "/items/" + references[i];
                         const itemPromise = firebase.database().ref(reference).once("value");

                         itemPromises.push(itemPromise);
                     }
                     let colPromise = Promise.all(itemPromises)
                         .then((itemsData) => {
                             for (let snapshot of itemsData) {
                                 const item = snapshot.val();
                                 if (!item) {
                                     return;
                                 }
                                 items.push({
                                     key: snapshot.key,
                                     name: item.name,
                                     image: item.image,
                                     href: item.href,
                                     description: item.description
                                 });
                             }
                             collections.push({
                                 key: childSnapshot.key,
                                 author: childData.author,
                                 items: items,
                                 colType: childData.colType,
                                 description: childData.description,
                                 isPrivate: childData.isPrivate,
                                 timestamp: childData.timestamp
                             })
                         })
                         .catch((error) => reject(error));
                     colPromises.push( colPromise );
                 });
                 Promise.all( colPromises )
                     .then( () => resolve(collections))
                     .catch((error) => reject(error));
             })
             .catch((error) => reject(error));
     });
 }

function getCollectionByKey(key) {
     //const myId = firebase.auth().currentUser.uid;
     const collections = [];
     const query = firebase.database().ref("collections").orderByKey().equalTo(key);
     const colPromises = [];
     return new Promise( (resolve, reject) => {
         query.once("value")
             .then(function (snapshot) {
                 snapshot.forEach(function (childSnapshot) {
                     var childData = childSnapshot.val();
                     var items = [];
                     const itemPromises = [];
                     let references = childData.items;
                     if (!references) {
                         references = [];
                     }
                     for (let i = 0, len = references.length; i < len; i += 1) {
                         if (references[i] === 'init') {
                             continue;
                         }
                         const reference = "/items/" + references[i];
                         const itemPromise = firebase.database().ref(reference).once("value");

                         itemPromises.push(itemPromise);
                     }
                     let colPromise = Promise.all(itemPromises)
                         .then((itemsData) => {
                             for (let snapshot of itemsData) {
                                 const item = snapshot.val();
                                 if (!item) {
                                     return;
                                 }
                                 items.push({
                                     key: snapshot.key,
                                     name: item.name,
                                     image: item.image,
                                     href: item.href,
                                     description: item.description
                                 });
                             }
                             collections.push({
                                 key: childSnapshot.key,
                                 author: childData.author,
                                 items: items,
                                 colType: childData.colType,
                                 description: childData.description,
                                 isPrivate: childData.isPrivate,
                                 timestamp: childData.timestamp
                             })
                         })
                         .catch((error) => reject(error));
                     colPromises.push(colPromise);
                 });
                 Promise.all( colPromises )
                    .then( () => resolve(collections))
                    .catch((error) => reject(error));
             })
             .catch((error) => reject(error));
     });
 }

function getAllCollections() {
     const myId = firebase.auth().currentUser.uid;
     const collections = [];
     const query = firebase.database().ref("collections");
     const colPromises = [];
     return new Promise( (resolve, reject) => {
         query.once("value")
             .then(function (snapshot) {
                 snapshot.forEach(function (childSnapshot) {
                     var childData = childSnapshot.val();
                     if (childData.uid != myId && childData.isPrivate) {
                         return;
                     }
                     var items = [];
                     const itemPromises = [];
                     let references = childData.items;
                     if (!references) {
                         references = [];
                     }
                     for (let i = 0, len = references.length; i < len; i += 1) {
                         if (references[i] === 'init') {
                             continue;
                         }
                         const reference = "/items/" + references[i];
                         const itemPromise = firebase.database().ref(reference).once("value");
                         itemPromises.push(itemPromise);
                     }
                     let colPromise = Promise.all(itemPromises)
                         .then((itemsData) => {
                             for (let snapshot of itemsData) {
                                 const item = snapshot.val();
                                 if (!item) {
                                     return;
                                 }
                                 items.push({
                                     key: snapshot.key,
                                     name: item.name,
                                     image: item.image,
                                     href: item.href,
                                     description: item.description
                                 });
                             }
                             collections.push({
                                 key: childSnapshot.key,
                                 author: childData.author,
                                 items: items,
                                 colType: childData.colType,
                                 description: childData.description,
                                 isPrivate: childData.isPrivate,
                                 timestamp: childData.timestamp
                             })
                         })
                         .catch( (error) => reject(error) );
                     colPromises.push(colPromise);
                 });
                 Promise.all( colPromises )
                     .then( () => resolve(collections))
                     .catch((error) => reject(error));
             })
             .catch( (error) => reject(error) );
     });
 }

//function updateData( key , values ) {
//    //Validator.validateUpdateData( key, values );
//    const reference = values.dataType + '/' + key;
//    const ref = firebase.database().ref( reference );
//    return new Promise( ( resolve, reject ) => {
//        ref.once('value')
//            .then( (snapshot) => {
//                const keysNotFound = [];
//                const update = snapshot.val();
//                for (let key in values) {
//                    if (key === 'dataType') {
//                        continue;
//                    }
//                    if (!snapshot.child(key).exists()) {
//                        keysNotFound.push( key );
//                    }
//                    update[key] = values[key];
//                }
//                if (keysNotFound.length > 0) {
//                    console.log( keysNotFound );
//                    reject( 'Following keys: ' + keysNotFound.join(', ') + ' not found!')
//                }
//                ref.set(update)
//                    .then( () => resolve() )
//                    .catch( (error) => reject(error) );
//
//            })
//            .catch( (error) => reject(error) );
//    });
//}

function deleteItem (itemKey, collectionKey) {
    return new Promise( (resolve, reject) => {
        getCollectionByKey( collectionKey )
            .then( (collections) => {
                let collection = collections[0];
                let items = ['init'];
                for (let item of collection.items) {
                    if (item.key !== itemKey ) {
                        items.push(item.key);
                    }
                }
                collection.items = items;
                collection[ 'dataType' ] = 'collections';
                const colPromise = firebase.database().ref('/collections/' + collectionKey + '/items')
                    .set( items );
                const itemPromise = firebase.database().ref('/items/' + itemKey ).remove();
                Promise.all([ colPromise, itemPromise ] )
                    .then( () => resolve() )
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}


 export {
     writeNewItem,
     writeNewCollection,
     getMyItems,
     getMyCollections,
     getAllCollections,
//     updateData,
     getCollectionByKey,
     deleteItem
     };