import { load as loadTemplate } from 'templates';
import User from 'userController';
import * as data from 'data';

const $appContainer = $('#app-container');


export function get(params) {
    loadTemplate('currentUserCollections')        
        .then(template => {
            const collections = data.getMyCollections();
            $appContainer.html(template(collections));
        })        
}
