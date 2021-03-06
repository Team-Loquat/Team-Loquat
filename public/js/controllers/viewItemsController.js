/* globals $ */
import {load as loadTemplate} from 'templates';
import * as data from 'data';


const $appContainer = $('#app-container');

export function get(params) {
    return new Promise((resolve, reject) => {
        let key = $('#key-container').html();
        if (params) {
            key = params.collectionID;
        }
        data.getCollectionByKey(key).then((collection) => {
            resolve(loadTemplate('viewItems', collection[0])
                .then((template) => {
                    $appContainer.html(template);
                }));
        });
    });
}
