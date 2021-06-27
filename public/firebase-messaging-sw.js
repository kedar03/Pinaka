// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyANkYMlK_14wWIcWQur2oyevdncVWQxHM8',
    authDomain: 'pinaka-290804.firebaseapp.com',
    databaseURL: 'https://pinaka-290804.firebaseio.com',
    projectId: 'pinaka-290804',
    storageBucket: 'pinaka-290804.appspot.com',
    messagingSenderId: '928781664413',
    appId: '1:928781664413:web:abb37dfb4fc84785645474',
    measurementId: 'G-5131R3QXJH'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        //icon: '/firebase-logo.png'
    };
    
    self.registration.showNotification(notificationTitle,
        notificationOptions);
})


/*
self.addEventListener('push', payload => {
    console.log('[firebase-messaging-sw.js] Push Received.');
  
    const title = payload.notification.title;
    const options = {
      body: payload.notification.body,
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

*/


