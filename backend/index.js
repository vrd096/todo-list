const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { Firestore } = require('@google-cloud/firestore');
const serviceAccount = require('../config/serviceAccountKey.json');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.sendReminderNotification = functions.firestore
  .document('users/{userId}/todos/{todoId}')
  .onUpdate((change, context) => {
    const todo = change.after.data().todo;
    const reminder = todo.reminder.toDate();
    const now = new Date();
    console.log(todo);
    // if (reminder.getTime() === now.getTime()) {
    //   const userId = context.params.userId;
    //   const todoId = context.params.todoId;
    //   const payload = {
    //     notification: {
    //       title: 'Reminder',
    //       body: todo.title,
    //     },
    //   };
    //   return admin.messaging().sendToTopic(`reminders_${userId}`, payload);
    // } else {
    //   return null;
    // }
  });

// exports.addEventToCalendar = functions.firestore
//   .document('users/{userId}/todos')
//   .onCreate(async (snap, context) => {
//     const event = snap.data();
//     const auth = await google.auth.getClient({
//       scopes: ['https://www.googleapis.com/auth/calendar'],
//     });
//     const calendar = google.calendar({ version: 'v3', auth });
//     const calendarId = 'primary';
//     const eventStartTime = new Date(event.start_time);
//     const eventEndTime = new Date(event.end_time);
//     const eventDetails = {
//       summary: event.title,
//       location: event.location,
//       description: event.description,
//       start: {
//         dateTime: eventStartTime.toISOString(),
//         timeZone: 'America/Los_Angeles',
//       },
//       end: {
//         dateTime: eventEndTime.toISOString(),
//         timeZone: 'America/Los_Angeles',
//       },
//       reminders: {
//         useDefault: true,
//       },
//       attendees: [
//         { email: `${context.auth.token.email}` },
//         { email: `${event.userId}@example.com` },
//       ],
//     };
//     await calendar.events.insert({
//       auth,
//       calendarId,
//       resource: eventDetails,
//     });
//   });

// functions.use(
//   admin.auth().addAuthStateListener(async (authUser) => {
//     if (authUser && authUser.email) {
//       console.log('User logged in', authUser);
//     } else {
//       console.log('No user logged in');
//     }
//   }),
// );
// export { database, firestore };

// app.on('request', (req, res) => {
//   // Получаем данные из запроса
//   const data = req.body;
//   // Отправка данных в Firebase
//   db.collection('yourCollection')
//     .doc('yourDocument')
//     .set(data)
//     .then(() => {
//       res.status(200).send('Данные успешно отправлены');
//     })
//     .catch((error) => {
//       console.error('Ошибка при отправке данных:', error);
//       res.status(500).send('Ошибка отправки данных');
//     });
// });

// exports.sendNotifications = functions.https.onRequest((req, res) => {
//   // Получаем текст задачи и время напоминания от пользователя
//   const taskText = req.query.taskText;
//   const remindTime = req.query.remindTime;
//   // Создаем объект данных для уведомления
//   const payload = {
//     notification: {
//       title: 'Task reminder',
//       body: taskText,
//       sound: 'default',
//     },
//     data: {
//       remindTime,
//     },
//   };
//   // Отправляем уведомление через Firebase Cloud Messaging
//   admin
//     .messaging()
//     .send(payload)
//     .then(() => {
//       console.log('Notification sent successfully!');
//       res.status(200).send('OK');
//     })
//     .catch((error) => {
//       console.error('Error sending notification:', error);
//       res.status(400).send(`Error sending notification: ${error}`);
//     });
// });
