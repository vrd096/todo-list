import { gapi } from 'gapi-script';
import { Todo } from '../redux/tasks/types';
import { isEqual } from 'date-fns';

const calendarID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const scope = 'https://www.googleapis.com/auth/calendar.events';
// export const addEventGoogleCalendar = (task: Todo) => {
//   if (task.reminder != '') {
//     const event = {
//       summary: task.title,
//       start: {
//         dateTime: new Date(task.reminder),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       end: {
//         dateTime: new Date(new Date(task.reminder).getTime() + 60 * 60 * 1000),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       // повторяющееся событие recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
//       // Параметр attendees используется для добавления участников в событие: [],
//       reminders: {
//         useDefault: false,
//         overrides: [
//           // { method: 'email', minutes: 24 * 60 },
//           { method: 'popup', minutes: 0 },
//         ],
//       },
//     };

//     function getAccessToken() {
//       gapi.load('client:auth2', () => {
//         gapi.client.init({
//           apiKey: apiKey,
//           clientId: calendarID,
//           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//           scope: 'https://www.googleapis.com/auth/calendar.events',
//         });
//         gapi.auth2
//           .getAuthInstance()
//           .signIn()
//           .then(() => {
//             const accessToken = gapi.auth2
//               .getAuthInstance()
//               .currentUser.get()
//               .getAuthResponse().access_token;
//             localStorage.setItem('access_token', accessToken);
//             addPostGoggleCalendar();
//             return accessToken;
//           });
//       });
//     }

//     const addPostGoggleCalendar = () => {
//       const tokenStorage = localStorage.getItem('access_token');

//       function initiate() {
//         gapi.client
//           .request({
//             path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
//             method: 'POST',
//             body: event,
//             headers: {
//               'Content-type': 'application/json',
//               Authorization: `Bearer ${tokenStorage}`,
//             },
//           })
//           .then((response: any) => {
//             return [true, response];
//           })
//           .catch((err: any) => {
//             if (err.status === 401) {
//               getAccessToken();
//             }
//             console.log(err);
//             return [false, err];
//           });
//       }
//       gapi.load('client', initiate);
//     };
//     addPostGoggleCalendar();
//   }
// };

// accessToken.js
function getAccessToken(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: apiKey,
          clientId: calendarID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: scope,
        })
        .then(() => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              const accessToken = gapi.auth2
                .getAuthInstance()
                .currentUser.get()
                .getAuthResponse().access_token;
              localStorage.setItem('access_token', accessToken);
              resolve();
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export const addEventGoogleCalendar = async (task: Todo) => {
  const addPostGoggleCalendar = () => {
    const tokenStorage = localStorage.getItem('access_token');
    const event = {
      summary: task.title,
      start: {
        dateTime: new Date(task.reminder),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(new Date(task.reminder).getTime() + 60 * 60 * 1000),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 0 }],
      },
    };

    return new Promise((resolve, reject) => {
      function initiate() {
        gapi.client
          .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
            method: 'POST',
            body: event,
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${tokenStorage}`,
            },
          })
          .then((response: any) => {
            resolve([true, response]);
          })
          .catch((err: any) => {
            if (err.status === 401) {
              getAccessToken()
                .then(() => {
                  initiate();
                })
                .catch((err) => {
                  console.log(err);
                  reject([false, err]);
                });
            } else {
              console.log(err);
              reject([false, err]);
            }
          });
      }
      gapi.load('client', initiate);
    });
  };

  try {
    await addPostGoggleCalendar();
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventGoogleCalendar = async (task: Todo) => {
  const removeEvent = async (events: any) => {
    const tokenStorage = localStorage.getItem('access_token');

    const eventId: string = events.filter((event: any) => {
      const dateCalendar = new Date(event.start.dateTime);
      const dateTask = new Date(task.reminder);
      if (isEqual(dateCalendar, dateTask)) {
        return event.summary === task.title && event.id !== undefined;
      }
    })[0]?.id;

    return new Promise((resolve, reject) => {
      function initiate() {
        gapi.client
          .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${tokenStorage}`,
            },
          })
          .then((response: any) => {
            resolve([true, response]);
          })
          .catch((err: any) => {
            if (err.status === 401) {
              getAccessToken()
                .then(() => {
                  initiate();
                })
                .catch((err) => {
                  console.log(err);
                  reject([false, err]);
                });
            } else {
              console.log(err);
              reject([false, err]);
            }
          });
      }
      gapi.load('client', initiate);
    });
  };

  const getEvents = () => {
    const tokenStorage = localStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
      function initiate() {
        gapi.client
          .init({
            apiKey: apiKey,
          })
          .then(function () {
            return gapi.client.request({
              path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${tokenStorage}`,
              },
            });
          })
          .then((response: any) => {
            let events = response.result.items;
            resolve(events);
          })
          .catch((err: any) => {
            if (err.status === 401) {
              getAccessToken()
                .then(() => {
                  initiate();
                })
                .catch((err) => {
                  console.log(err);
                  reject([false, err]);
                });
            } else {
              console.log(err);
              reject([false, err]);
            }
          });
      }
      gapi.load('client', initiate);
    });
  };

  try {
    const events = await getEvents();
    await removeEvent(events);
  } catch (error) {
    console.log(error);
  }
};
