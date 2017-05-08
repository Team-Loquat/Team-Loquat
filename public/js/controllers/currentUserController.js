import { load as loadTemplate } from 'templates';
import User from 'userController';
import * as data from 'data';

const $appContainer = $('#app-container');
 
export function get(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('currentUser')
            .then(template => {
                $appContainer.html(template);
            }));
    });
}
