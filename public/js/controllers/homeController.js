/* globals $ */

import {load as loadTemplate} from 'templates';
import * as data from 'data';

const $appContainer = $('#app-container');

export function get(params) {
    return new Promise((resolve, reject) => {
        data.getAllCollections().then((collections) => {
            resolve(loadTemplate('home', collections)
                .then((template) => {
                    $appContainer.html(template);
                }));
        });
    });
}
