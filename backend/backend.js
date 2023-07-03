import firebase from 'firebase';
import 'firebase/firestore';
import functions from 'firebase-functions';
import admin from 'admin-sdk';

const firebaseConfig = {
  apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
  authDomain: 'todotimekeeper.firebaseapp.com',
  projectId: 'todotimekeeper',
  storageBucket: 'todotimekeeper.appspot.com',
  messagingSenderId: '1076102409898',
  appId: '1:1076102409898:web:142757f96e24e9311faad3',
  measurementId: 'G-M99G9VDTKJ',
};
const database = firebase.database();
const firestore = firebase.firestore();
admin.initializeApp(firebaseConfig);
export const db = app.firestore();
functions.use(
  admin.auth().addAuthStateListener(async (authUser) => {
    if (authUser && authUser.email) {
      console.log('User logged in', authUser);
    } else {
      console.log('No user logged in');
    }
  }),
);
export { database, firestore };

app.on('request', (req, res) => {
  // Получаем данные из запроса
  const data = req.body;
  // Отправка данных в Firebase
  db.collection('yourCollection')
    .doc('yourDocument')
    .set(data)
    .then(() => {
      res.status(200).send('Данные успешно отправлены');
    })
    .catch((error) => {
      console.error('Ошибка при отправке данных:', error);
      res.status(500).send('Ошибка отправки данных');
    });
});

exports.sendNotifications = functions.https.onRequest((req, res) => {
  // Получаем текст задачи и время напоминания от пользователя
  const taskText = req.query.taskText;
  const remindTime = req.query.remindTime;
  // Создаем объект данных для уведомления
  const payload = {
    notification: {
      title: 'Task reminder',
      body: taskText,
      sound: 'default',
    },
    data: {
      remindTime,
    },
  };
  // Отправляем уведомление через Firebase Cloud Messaging
  admin
    .messaging()
    .send(payload)
    .then(() => {
      console.log('Notification sent successfully!');
      res.status(200).send('OK');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(400).send(`Error sending notification: ${error}`);
    });
});
