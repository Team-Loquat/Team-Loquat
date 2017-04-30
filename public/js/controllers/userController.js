import * as firebase from 'firebase';

export default class User {

    static currentUser() {
        return {
            email: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid
        }
    }

    static registerUser(email, password, onSuccess, onError) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (onError) {
                    onError(error);
                } else {
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                }
            })
            .then( () => {
                firebase.auth().signInWithEmailAndPassword(email, password);
                if (onSuccess) {
                    onSuccess();
                }
            });
    }

    static initAuthStatusChange() {
        firebase.auth().onAuthStateChanged( function (user) {
            $('#verify-btn').addClass( 'hidden' );
            if (user) {
                var email = user.email;
                var emailVerified = user.emailVerified;
                $('#sign-in-status').text( `Signed in with ${email}` );
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text( 'Sign out' );
                if (!emailVerified) {
                    $('#verify-btn').removeClass( 'hidden' );
                    $('#verify-btn').click( User.verifyAcocunt );
                }
            } else {
                $('#sign-in-status').text( 'Signed out' );
                $('#sign-in-btn').text( 'Sign in' );
                $('#register-btn').removeClass( 'hidden' );
            }
        });
    }

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then( ()=> alert( `Verification e-mail sent to ${User.currentUser().email}` ))
            .catch( ()=> alert( 'Something went wrong. Please try again!' ) );
    }

    static signOut() {
        firebase.auth().signOut()
            .catch( ()=> alert('Something went wrong. Please try again!') );
    }

    static signIn( email, password, onSuccess, onError ) {
        firebase.auth().signInWithEmailAndPassword( email, password )
            .catch( error => {
                if (onError) {
                    onError(error);
                } else {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                }
            })
            .then( ()=> {
                if (onSuccess) {
                    onSuccess();
                }
            } );
    }
}
