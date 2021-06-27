import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/messaging";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const doSignInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const doSignOut = () => auth.signOut();

export const messaging = firebase.messaging();

/**
 * Request the permission for FCM
 * and is able to receive the FCM from pharmacy if the user is in our web page.
 */
Notification.requestPermission()
    .then(() => {
        console.log("Permission granted!");
    })
    .catch(() => {
        console.log("Permission denied!");
    });

messaging.onMessage(payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        //icon: '/firebase-logo.png'
    };

    new Notification(notificationTitle,
        notificationOptions);
        
  });

export default firebase;