import 'jquery';
import * as firebase from 'firebase';
import Navigo from 'navigo';

import { get as homeController } from 'homeController';
import { get as invalidController } from 'invalidController';
import { get as registerController } from 'registerController';
import { get as signInController } from 'signInController';

var config = {
    apiKey: "AIzaSyCz2bogeJ0iDRTyHTTww4MNCtQQHW06gOg",
    authDomain: "loquat-collector.firebaseapp.com",
    databaseURL: "https://loquat-collector.firebaseio.com",
    storageBucket: "loquat-collector.appspot.com",
    messagingSenderId: "557014286847"
};

firebase.initializeApp(config);


var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

router
    .on(() => {
        homeController();
    })
    .resolve();

router.on('/home', homeController);
router.on('/signin', signInController);
router.on('/register', registerController);

router.notFound(function () {
    invalidController();
});

 