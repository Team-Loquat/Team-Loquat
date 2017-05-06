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
import {
    get as collectionManageController
} from 'collectionManageController';

const root = null;
const useHash = false;
const hash = '#!';

const router = new Navigo(root, useHash, hash);

const keys = [];

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
            .then(() => {

                $('.collection-manage-btn').click(() => {
                    const key = $('.collection-manage-btn').next().html();
                    $('#key-container').html(key);
                    console.log(key);
                    router.navigate('#/collection-manage/');

                });


            })
    })
    .on('/create-collection/', () => {
        $.when(createNewCollectionController())
            .then(() => {
                $("#create-collection-btn").on('click', function () {
                    const items = [];
                    const type = $('#inputCollectionType').val();
                    const description = $('#inputCollectionDescription').val();

                    data.writeNewCollection(items, type, description);

                    router.navigate('#/collections/');
                });
            });
    })
    .on('/collection-manage/', () => {
        $.when(collectionManageController())
            .then(() => {
                $('#item-add-btn').click(() => {
                    const collectionId = $('#key-container').html();
                    console.log("collid" + '*' + collectionId)
                    const itemToSearch = $('#itemToSearch').val();
                    console.log(itemToSearch);
                    const requestUrl = 'http://www.omdbapi.com/?t=';
                    $.get(requestUrl + itemToSearch).then((jsonData) => {                         
                         data.writeNewItem(collectionId, jsonData.Title, jsonData.Poster, jsonData.Plot);
                    });
                    
                })
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


export {
    router,
}