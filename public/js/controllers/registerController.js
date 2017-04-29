import 'jquery';
import { load as loadTemplate } from 'templates';

import { addNewUserToDatabase as createNewUser } from 'data';

const $appContainer = $('#app-container');



export function registerUser() {    
    const firstName = $('#inputFirstName').val();
    const lastName = $('#inputLastName').val();
    const userName = $('#inputUserName').val();
    const password = $('#inputPassword').val();
    const email = $('#inputEmail').val();
    
    createNewUser(firstName, lastName, userName, password, email).then();
 
}

export function get(params) {
    loadTemplate('register')
        .then(template => {
            $appContainer.html(template());
        });
}