import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/messaging';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
  authDomain: 'todotimekeeper.firebaseapp.com',
  projectId: 'todotimekeeper',
  storageBucket: 'todotimekeeper.appspot.com',
  messagingSenderId: '1076102409898',
  appId: '1:1076102409898:web:142757f96e24e9311faad3',
  measurementId: 'G-M99G9VDTKJ',
});
const db: Firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);

// const sendNotification = (token: string) => {
//   const notificationOptions = {
//     title: 'Напоминание',
//     body: 'Firebase Cloud Messaging (FCM) - это кроссплатформенное решение для отправки сообщений, которое позволяет надежно отправлять сообщения без дополнительной оплаты. Используя FCM, вы можете уведомлять пользователей о новых сообщениях или событиях на вашем сервере.',
//     icon: 'https://cdn-icons-png.flaticon.com/512/7177/7177076.png',
//   };

//   axios
//     .post(
//       'https://fcm.googleapis.com/fcm/send',
//       {
//         notification: notificationOptions,
//         to: token,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization:
//             'key=AAAA-oyzrqo:APA91bHg2wscNMKvGtjaqR_iUXt0PVc8_XC-n3NVpT7ufFtCZUvRAq5F4x4nDGn-Jadjow8BYpkUqwU7yPnftpN_wV8aHeQ4quMX6ecAEImOdIh8EyKYO3yYcWS1M7hsoBM9p-XvIJ2y',
//         },
//       },
//     )
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// function requestPermission() {
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');

//       getToken(messaging, {
//         vapidKey:
//           'BOnMoqsoaVxz_9bIRAtxtfM19MQPP9yPY5fTETYOW6l7nPBRj7ne3jbieORURLTvtQjeC56pJPcM_e8Q7q0ESlA',
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log('Registration token:', currentToken);
//             sendNotification(currentToken);
//           } else {
//             console.log('No registration token available. Request permission to generate one.');
//           }
//         })
//         .catch((err) => {
//           console.log('An error occurred while retrieving token. ', err);
//         });
//     }
//   });
// }
// requestPermission();

// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

// exports.scheduleNotification = functions.pubsub
//   .schedule('every day 07:00')
//   .onRun(async (context) => {
//     const payload = {
//       notification: {
//         title: 'Reminder',
//         body: 'It is time to take your medication.',
//       },
//     };
//     const options = {
//       priority: 'high',
//       timeToLive: 60 * 60 * 24,
//     };
//     const response = await admin.messaging().sendToTopic('medication', payload, options);
//     console.log('Successfully sent message:', response);
//   });

// messaging.onMessage((payload) => {
//   console.log('Message received:', payload);
// });

export { firebaseApp, db, auth, onAuthStateChanged };
