import 'jquery';
import Navigo from 'navigo';

import {
    get as homeController
} from 'homeController';
import {
    get as invalidController
} from 'invalidController';
import {
    get as registerController
} from 'registerController';
import {
    get as signInController
} from 'signInController';

import User from 'user';

var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);



router.on('/home', homeController);
router.on('/signin', signInController);
router.on('/register', registerController);

router
    .on(() => {
        homeController();
    })
    .resolve();

router.notFound(function () {
    invalidController();
});

User.initAuthStatusChange();
$('#verify-btn').click( User.verifyAcocunt );
$('#sign-in-btn').click( () => {
    if ($('#sign-in-btn').text() === 'Sign out') {
        User.signOut();
    } else {
        router.navigate('/signin')
    }
})

