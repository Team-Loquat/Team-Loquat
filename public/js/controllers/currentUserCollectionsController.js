/* globals $ */

import {load as loadTemplate} from 'templates';
import * as data from 'data';

const $appContainer = $('#app-container');

export function get(params) {
    return new Promise((resolve, reject) => {
        data.getMyCollections().then((collections) => {
            resolve(loadTemplate('currentUserCollections', collections)
                .then((template) => {
                    $appContainer.html(template);
                })
            );
        });
    });
}

