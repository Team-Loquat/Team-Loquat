//import 'jquery';
import Navigo from 'navigo';
import User from 'userController';
import * as data from 'data';

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
import {
    get as currentUserController
} from 'currentUserController';
import {
    get as currentUserCollectionsController
} from 'currentUserCollectionsController';
import {
    get as createNewCollectionController
} from 'createNewCollectionController';

const root = null;
const useHash = false;
const hash = '#!';

const router = new Navigo(root, useHash, hash);

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
            .then();
    })
    .on('/user/*', () => {
        $.when(currentUserController())
            .then(() => {
                $("#new-collection").on('click', function () {
                    router.navigate('#/create-collection/');
                });

                $("#view-collections").on('click', function () {
                    router.navigate('#/collections/');
                });

            });
    })
    .on('/collections/', () => {
        $.when(currentUserCollectionsController())
            .then();
    })
    .on('/create-collection/', () => {
        $.when(createNewCollectionController())
            .then(() => {
                $("#create-collection-btn").on('click', function () {
                    const items = [];
                    const type = $('#inputCollectionType').val();
                    const description = $('#inputCollectionType').val();
                   
                    data.writeNewCollection(items, type, description);

                    router.navigate('#/collections/');
                });
            });
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
    }
});

export default router;