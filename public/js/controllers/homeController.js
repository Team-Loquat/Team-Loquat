import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

function get(params) {
    loadTemplate('home')
        .then(template => {
            $appContainer.html(template());
        });
}

export {
    get
} 