//import 'jquery';
import {
    load as loadTemplate
} from 'templates';
import User from 'userController';

const $appContainer = $('#app-container');

export function register() {
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();

    User.registerUser(email, password);
}

 
export function get(params) {
    return new Promise((resolve, reject) => {
        resolve(loadTemplate('register')
            .then(template => {
                $appContainer.html(template);
            }).then(() => {
                $('#send-register-btn').click(register);
            }));
    });
}