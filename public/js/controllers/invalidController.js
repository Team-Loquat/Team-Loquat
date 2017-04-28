import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get(params) {
    loadTemplate('invalid')
        .then(template => {
            $appContainer.html(template());
        });
}

 