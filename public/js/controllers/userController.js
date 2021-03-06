/* globals $ toastr */
import * as firebase from 'firebase';
import {router as router} from 'app';
import {CONSTANTS as CONSTANTS} from 'constants';

export default class User {

    static currentUser() {
        return {
            email: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid,
        };
    }

    static registerUser(email, password, onSuccess, onError) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;

                if (onError) {
                    onError(error);
                } else {
                    if (errorCode == 'auth/weak-password') {
                        toastr.error(CONSTANTS.WEAK_PASSWORD);
                    } else {
                        toastr.error(errorMessage);
                    }
                }
            })
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password);

                if (onSuccess) {
                    toastr.success(CONSTANTS.USER_SIGNED_IN);
                    onSuccess();
                }
            });
    }

    static initAuthStatusChange() {
        firebase.auth().onAuthStateChanged(function(user) {
            $('#verify-btn').addClass('hidden');
            if (user) {
                let email = user.email;
                let emailVerified = user.emailVerified;

                $('#sign-in-status').text(`Signed in with ${email}`);
                $('#register-btn').addClass('hidden');
                $('#sign-in-btn').text('Sign out');

                if (!emailVerified) {
                    $('#verify-btn').removeClass('hidden');
                    $('#verify-btn').click( () => {
                        User.verifyAcocunt();
                    });
                }

                const routeId = '#/user/' + User.currentUser().email.split('@')[0];
                router.navigate(routeId);

                toastr.warning(CONSTANTS.USER_REDIRECTED_TO_PROFILE);

                $('#profile-btn').attr('href', routeId).removeClass('hidden');
            } else {
                $('#sign-in-status').text('Signed out');
                $('#sign-in-btn').text('Sign in');
                $('#register-btn').removeClass('hidden');
                $('#profile-btn').addClass('hidden').attr('href', '');
            }
        });
    }

    static verifyAcocunt() {
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => toastr.warning(CONSTANTS.VERIFICATION_EMAIL_SENT + User.currentUser().email))
            .catch(() => toastr.error(CONSTANTS.VERFICATION_EMAIL_WENT_WRONG));
    }

    static signOut() {
        firebase.auth().signOut()
            .catch(() => toastr.error(CONSTANTS.USER_SIGNED_OUT_ERROR));
    }

    static signIn(email, password, onSuccess, onError) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                if (onError) {
                    onError(error);
                } else {
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    if (errorCode === 'auth/wrong-password') {
                        toastr.error(CONSTANTS.USER_WRONG_PASSWORD);
                    } else {
                        toastr.error(errorMessage);
                    }
                }
            })
            .then(() => {
                if (onSuccess) {
                    onSuccess();
                }
            });
    }
}
