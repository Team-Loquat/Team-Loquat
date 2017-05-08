/* globals $ */

import {load as loadTemplate} from 'templates';

const $appContainer = $('#app-container');

export function get(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('createNewCollection')
            .then((template) => {
                $appContainer.html(template);
            }));
    });
}
