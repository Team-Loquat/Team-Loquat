import 'jquery';
import { load as loadTemplate } from 'templates';

import * as registerUser from 'data';
import User from 'user';

const $appContainer = $('#app-container');

const getNextId = (function () {
    let counter = 1;

    return function () {
        counter += 1;
        return counter;
    };
}());


function register() {
    const userId = getNextId();
    const firstName = $('#inputFirstName').val();
    const lastName = $('#inputLastName').val();
    const userName = $('#inputUserName').val();
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();
    User.auth( email, password );

   //registerUser(userId, firstName, lastName, userName, email);
 
}

export function get(params) {
    loadTemplate('register')
        .then(template => {
            $appContainer.html(template());
        }).then(() => {
            $('#send-registration-btn')
                .click( register );
        });
}