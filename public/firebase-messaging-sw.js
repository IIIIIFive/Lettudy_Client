importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyDV48T022R7NgrJK6DvOAcyurSRd-zfZR4',
  projectId: 'lettudy',
  messagingSenderId: '766963505798',
  appId: '1:766963505798:web:9f1ceeb11f79d9d6344f07',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const {
    notification: { title, body },
  } = payload;
  const notificationTitle = title;
  const notificationOptions = {
    body,
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
