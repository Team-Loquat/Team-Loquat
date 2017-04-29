import { load as loadTemplate } from 'templates';
import User from 'user';

const $appContainer = $('#app-container');

function signIn() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();
    User.signIn( email, password );
}

export function get(params) {
    loadTemplate('signIn')
        .then(template => {
            $appContainer.html(template());
        })
        .then(() => {
            $('#send-sign-in-btn').click(signIn)
        });
}

 