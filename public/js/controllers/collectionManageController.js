import {
    load as loadTemplate
} from 'templates';
import User from 'userController';
import * as data from 'data';


const $appContainer = $('#app-container');

export function get(params) {
    return new Promise((resolve, reject) => {
        const key = $('#key-container').html();
        data.getCollectionByKey(key).then((collection) => {            
            collection[0].items.shift();            

            resolve(loadTemplate('collectionManage', collection[0])
                .then(template => {
                    $appContainer.html(template);
                }));
        })
    });
}