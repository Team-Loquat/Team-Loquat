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
import {
    get as viewItemsController
} from 'viewItemsController';

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
            .then(() => {
                    $('.collection-view-btn').click((ev) => {
                        const key = $(ev.target).next().html();
                        $('#key-container').html(key);

                        router.navigate('#/view-items/');
                    });
                }

            )
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

                $('.collection-manage-btn').click((ev) => {
                    const key = $(ev.target).next().html();
                    $('#key-container').html(key);
                    console.log(key);
                    router.navigate('#/collection-manage/');

                });

                $('.collection-delete-btn').click((ev) => {
                    const key = $(ev.target).prev().html();
                    data.deleteCollection(key);
                    $(ev.target).parent().parent().remove();
                });

                $('.collection-view-btn').click((ev) => {
                    const key = $(ev.target).next().next().html();
                    $('#key-container').html(key);

                    router.navigate('#/view-items/');
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
                    const isPrivate = !$('#isPublic').is(':checked');

                    data.writeNewCollection(items, type, description, isPrivate);

                    router.navigate('#/collections/');
                });
            });
    })
    .on('/collection-manage/', () => {
        $.when(collectionManageController())
            .then(() => {
                $('#item-add-btn').click((ev) => {
                    const collectionId = $('#key-container').html();
                    //console.log("collid" + '*' + collectionId)
                    const itemToSearch = $('#itemToSearch').val();
                    const itemToSearchType = $('#itemToSearchLabel').html();

                    if (itemToSearchType.indexOf('movie') >= 0) {
                        const requestUrl = 'http://www.omdbapi.com/?t=';

                        $.get(requestUrl + itemToSearch).then((jsonData) => {
                            data.writeNewItem(collectionId, jsonData.Title, jsonData.Poster, jsonData.Plot);
                        });
                    }
                    if (itemToSearchType.indexOf('song') >= 0) {
                        const requestUrl = 'https://api.spotify.com/v1/search?q="' + itemToSearch + '"&type=track';
                        $.get(requestUrl).then((jsonData) => {
                            jsonData = Object.values(jsonData)[0].items[0];

                            const durationMS = jsonData.duration_ms;
                            const durationMin = (durationMS / 1000 / 60) << 0;
                            const durationSeconds = Math.floor((durationMS / 1000) % 60);
                            const albumName = jsonData.album.name;
                            const artistName = jsonData.artists[0].name;
                            const description = 'Singer: ' + artistName + ' Duration: ' + durationMin + ':' + durationSeconds + ' From: "' + albumName + '" album';

                            const imageLink = jsonData.album.images[0].url;

                            data.writeNewItem(collectionId, jsonData.name, imageLink, description);
                        });
                    }
                    if (itemToSearchType.indexOf('book') >= 0) {

                    }

                })
            }).then(() => {
                $('.item-btn-delete').click((ev) => {

                    const collectionId = $('#key-container').html();
                    const itemKey = $('.item-btn-delete').next().html();

                    data.deleteItem(itemKey, collectionId);
                    $(ev.target).parent().parent().remove();
                });
            });
    })
    .on('/view-items', () => {
        $.when(viewItemsController())
            .then();
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