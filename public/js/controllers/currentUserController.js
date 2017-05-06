import { load as loadTemplate } from 'templates';
import User from 'userController';
import * as data from 'data';

const $appContainer = $('#app-container');

//.then( () => {
        //    $('#test-btn').click( () => {
        //        data.writeNewCollection( ['-KjDx8UXRvjM4h4hP92i', '-KjDx90X92ILDgwv-ey0'], 'movies', 'some Description' );
        //        data.getAllCollections( (collections) => console.log(collections) );
        //    })
        //} );
export function get(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('currentUser')
            .then(template => {
                $appContainer.html(template);
            }));
    });
}
