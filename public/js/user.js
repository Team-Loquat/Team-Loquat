import * as firebase from 'firebase';

export default class User {

    static currentUser() {
        return firebase.auth().currentUser;
    }

    static registerUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log('auth request sent')
        })
            .then( () => {
                firebase.auth().signInWithEmailAndPassword( email, password );
            });
    }

    static initAuthStatusChange() {
        firebase.auth().onAuthStateChanged( function (user) {
            $('#verify-btn').addClass('hidden');
            if (user) {
                // User is signed in.
                var email = user.email;
                var emailVerified = user.emailVerified;
                $('#sign-in-status').text( `Signed in with ${email}` );
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text( 'Sign out' );
                if (!emailVerified) {
                    $('#verify-btn').removeClass('hidden');
                }
            } else {
                $('#sign-in-status').text( 'Signed out' );
                $('#sign-in-btn').text( 'Sign in' );
                $('#register-btn').removeClass('hidden');
            }
        });
    }

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(()=> alert(`Verification e-mail sent to ${User.currentUser.email}`));
    }

    static signOut() {
        firebase.auth().signOut();
    }

    static signIn( email, password ) {
        firebase.auth().signInWithEmailAndPassword( email, password ).catch( error => {
            //handle errors
        });
    }
}
