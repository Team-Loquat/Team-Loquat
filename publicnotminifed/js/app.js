/* globals $ toastr */

// Routers
import Navigo from 'navigo';

// Users and data
import User from 'userController';
import * as data from 'data';

// Helpers
import {CONSTANTS as CONSTANTS} from 'constants';
import {VALIDATOR as VALIDATOR} from 'validator';
import 'facebookHelper';

// Controllers
import {get as homeController} from 'homeController';
import {get as invalidController} from 'invalidController';
import {get as registerController} from 'registerController';
import {get as signInController} from 'signInController';
import {get as currentUserController} from 'currentUserController';
import {get as currentUserCollectionsController} from 'currentUserCollectionsController';
import {get as createNewCollectionController} from 'createNewCollectionController';
import {get as collectionManageController} from 'collectionManageController';
import {get as viewItemsController} from 'viewItemsController';

// Navigo setup
const root = null;
const useHash = false;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

// Setting up routes
router
    .on('/', () => {
        router.navigate('#/home');
    })
    .on('/home', () => {
        $.when(homeController())
            .then(() => {
                // Opens collection
                $('.collection-view-btn').click((ev) => {
                    // Sets up key so we can check in which collection we are
                    const key = $(ev.target).next().html();
                    $('#key-container').html(key);

                    router.navigate('#/view-items/');
                });
            });
    })
    .on('/signin', () => {
        $.when(signInController())
            .then();
    })
    .on('/user/*', () => {
        $.when(currentUserController())
            .then(() => {
                $('#new-collection').on('click', function() {
                    router.navigate('#/create-collection/');
                });

                $('#view-collections').on('click', function() {
                    router.navigate('#/collections/');
                });
            });
    })
    .on('/collections/', () => {
        $.when(currentUserCollectionsController())
            .then(() => {
                $('.collection-manage-btn').click((ev) => {
                    // Sets collection key, so know in which collection we are
                    const key = $(ev.target).next().html();
                    $('#key-container').html(key);

                    router.navigate('#/collection-manage/');
                });
                // Deletes collection
                $('.collection-delete-btn').click((ev) => {
                    const key = $(ev.target).prev().html();
                    data.deleteCollection(key);
                    $(ev.target).parent().parent().remove();
                    toastr.warning(CONSTANTS.COLLECTION_DELETED);
                });
                // Opens collection
                $('.collection-view-btn').click((ev) => {
                    const key = $(ev.target).next().next().html();
                    $('#key-container').html(key);

                    router.navigate('#/view-items/');
                });
            });
    })
    .on('/create-collection/', () => {
        $.when(createNewCollectionController())
            .then(() => {
                // Creates new collection
                $('#create-collection-btn').on('click', function() {
                    const items = [];
                    const type = $('#inputCollectionType').val();
                    const description = $('#inputCollectionDescription').val();

                    VALIDATOR.checkIfValidCollectionType(type);
                    VALIDATOR.checkIfValidCollectionDescription(description);

                    // This negation is for better UX, and isPrivate is easier to understand for us if that makes any sense
                    const isPrivate = !$('#isPublic').is(':checked');

                    data.writeNewCollection(items, type, description, isPrivate);

                    router.navigate('#/collections/');
                });
            });
    })
    // Opens collection controls where user can add new items and remove old ones
    .on('/collection-manage/', () => {
        $.when(collectionManageController())
            .then(() => {
                // Adds item
                $('#item-add-btn').click((ev) => {
                    const collectionId = $('#key-container').html();

                    const itemToSearch = $('#itemToSearch').val();
                    const itemToSearchType = $('#itemToSearchLabel').html();
                    VALIDATOR.checkIfValidItemName(itemToSearch);
                    // Checks for the type of collection, so it can add proper item
                    if (itemToSearchType.indexOf('movie') >= 0) {
                        const requestUrl = 'http://www.omdbapi.com/?t="';

                        $.get(requestUrl + itemToSearch + '"').then((jsonData) => {
                            VALIDATOR.validateJsonObject(jsonData);

                            data.writeNewItem(collectionId, jsonData.Title, jsonData.Poster, jsonData.Plot);
                            $('#itemToSearch').val('');
                            toastr.success(CONSTANTS.MOVIE_ADDED);
                        });
                    }
                    if (itemToSearchType.indexOf('song') >= 0) {
                        const requestUrl = 'https://api.spotify.com/v1/search?q="' + itemToSearch + '"&type=track';
                        $.get(requestUrl).then((jsonData) => {
                            // Data parser for spotify api
                            VALIDATOR.validateJsonObject(jsonData);
                            jsonData = Object.values(jsonData)[0].items[0];

                            const durationMS = jsonData.duration_ms;
                            const durationMin = (durationMS / 1000 / 60) << 0;
                            const durationSeconds = Math.floor((durationMS / 1000) % 60);
                            const albumName = jsonData.album.name;
                            const artistName = jsonData.artists[0].name;
                            const description = 'Singer: ' + artistName + ' Duration: ' + durationMin + ':' + durationSeconds + ' From: "' + albumName + '" album';

                            const imageLink = jsonData.album.images[0].url;
                            $('#itemToSearch').val('');
                            data.writeNewItem(collectionId, jsonData.name, imageLink, description);
                            toastr.success(CONSTANTS.SONG_ADDED);
                        });
                    }
                    if (itemToSearchType.indexOf('book') >= 0) {
                        $.ajax('https://www.googleapis.com/books/v1/volumes?q="' + itemToSearch + '"').then((jsonData) => {
                            // data parser for google api
                            VALIDATOR.validateJsonObject(jsonData);

                            jsonData = Object.values(jsonData);
                            jsonData = jsonData[2][0].volumeInfo;
                            const title = jsonData.title;
                            const href = jsonData.imageLinks.thumbnail;
                            const description = jsonData.description;

                            data.writeNewItem(collectionId, title, href, description);
                            $('#itemToSearch').val('');
                            toastr.success(CONSTANTS.BOOK_ADDED);
                        });
                    }
                });
            }).then(() => {
                // delete item
                $('.item-btn-delete').click((ev) => {
                    const collectionId = $('#key-container').html();
                    const itemKey = $(ev.target).next().html();
                    data.deleteItem(itemKey, collectionId);
                    $(ev.target).parent().parent().remove();

                    toastr.warning(CONSTANTS.ITEM_DELETED);
                });
            });
    })
    .on('/view-items', () => {
        $.when(viewItemsController())
            .then();
    })
    .on('/view-items/:collectionID', (params) => {
        $.when(viewItemsController(params))
            .then();
    })
    .on('/register', () => {
        $.when(registerController())
            .then();
    }).resolve();

router.notFound(function() {
    invalidController();
});

User.initAuthStatusChange();

// Changes Sign in button to Sign out, when user signs in
$('#sign-in-btn').click(() => {
    if ($('#sign-in-btn').text() === 'Sign out') {
        User.signOut();
        toastr.success(CONSTANTS.USER_SIGNED_OUT);
    }
});


export {
    router,
};
