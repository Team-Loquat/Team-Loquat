import {
    load as loadTemplate
} from 'templates';
import User from 'userController';
import {
    writeNewItem
} from 'data';

const $appContainer = $('#app-container');

export function signIn() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();
    User.signIn(email, password);
}
 
export function get(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('signIn')
            .then(template => {
                $appContainer.html(template);
            }).then(() => {
                $('#send-sign-in-btn').click(signIn);
            }));
    });
}