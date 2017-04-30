import 'jquery';
import Navigo from 'navigo';
import User from 'userController';

import { get as homeController } from 'homeController';
import { get as invalidController } from 'invalidController';
import { get as registerController } from 'registerController';
import { get as signInController } from 'signInController';

var root = null;
var useHash = false;
var hash = '#!';

var router = new Navigo(root, useHash, hash);


router
    .on('/', () => {
        $.when(homeController())
            .then();
    })
    .on('/home', () => {
        $.when(homeController())
            .then()
    })
    .on('/signin', () => {
        $.when(signInController())
            .then()
    })
    .on('/register', () => {
        $.when(registerController())
            .then();
    }).resolve();

router.notFound(function () {
    invalidController();
});

User.initAuthStatusChange();

$('#sign-in-btn').click(() => {
    if ($('#sign-in-btn').text() === 'Sign out') {
        User.signOut();
    } else {
        router.navigate('/signin');
    }
})