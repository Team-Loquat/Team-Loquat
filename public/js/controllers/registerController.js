import 'jquery';
import { load as loadTemplate } from 'templates';

import * as registerUser from 'data';

import User from 'userController';

const $appContainer = $('#app-container');

export function register() {        
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();

    User.registerUser( email, password );
   //registerUser(userId, firstName, lastName, userName, email);
 
}

export function get(params) {
    loadTemplate('register')
        .then(template => {
            $appContainer.html(template());
        }).then( () => {
            $('#send-register-btn').click(register);
        });
}