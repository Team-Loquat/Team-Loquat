import * as firebase from 'firebase';

const db = (function() {
    const config = {
        apiKey: 'AIzaSyCz2bogeJ0iDRTyHTTww4MNCtQQHW06gOg',
        authDomain: 'loquat-collector.firebaseapp.com',
        databaseURL: 'https://loquat-collector.firebaseio.com',
        storageBucket: 'loquat-collector.appspot.com',
        messagingSenderId: '557014286847',
    };

    firebase.initializeApp(config);
    return firebase.database();
}());

export {
    db,
};
