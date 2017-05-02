import { load as loadTemplate } from 'templates';
import User from 'userController';

const $appContainer = $('#app-container');

 


export function get(params) {
    loadTemplate('currentUser')
        .then(template => {
            $appContainer.html(template());
        });
}
