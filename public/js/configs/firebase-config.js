import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCz2bogeJ0iDRTyHTTww4MNCtQQHW06gOg",
    authDomain: "loquat-collector.firebaseapp.com",
    databaseURL: "https://loquat-collector.firebaseio.com",
    storageBucket: "loquat-collector.appspot.com",
    messagingSenderId: "557014286847"
};

const firebaseInit = firebase.initializeApp(config);
const db = firebaseInit.database();


export {
    db
}