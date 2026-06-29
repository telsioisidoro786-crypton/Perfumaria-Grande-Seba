// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyClDRWSRKQqnuEZIqwp-xAE5_GO1Mqe9SA",
  authDomain: "perfumaria-grande-seba.firebaseapp.com",
  projectId: "perfumaria-grande-seba",
  storageBucket: "perfumaria-grande-seba.firebasestorage.app",
  messagingSenderId: "778632380574",
  appId: "1:778632380574:web:62bdc808436ea960723b8f"
});

const messaging = firebase.messaging();

// Notificações em background (quando o site está fechado)
messaging.onBackgroundMessage((payload) => {
  console.log('Notificação em background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});