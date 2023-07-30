import { gapi } from 'gapi-script';
import { Todo } from '../redux/tasks/types';

const calendarID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

export const addEventGoogleCalendar = (todoTask: Todo) => {
  if (todoTask.reminder != '') {
    const event = {
      summary: todoTask.title,
      start: {
        dateTime: new Date(todoTask.reminder),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(new Date(todoTask.reminder).getTime() + 60 * 60 * 1000),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      // повторяющееся событие recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      // Параметр attendees используется для добавления участников в событие: [],
      reminders: {
        useDefault: false,
        overrides: [
          // { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 0 },
        ],
      },
    };

    function getAccessToken() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: apiKey,
          clientId: calendarID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.events',
        });
        gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
            const accessToken = gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getAuthResponse().access_token;
            addPostGoggleCalendar(accessToken);

            return accessToken;
          });
      });
    }

    const addPostGoggleCalendar = (accessToken: string) => {
      function initiate() {
        gapi.client
          .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
            method: 'POST',
            body: event,
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(
            (response: any) => {
              return [true, response];
            },
            function (err: string) {
              console.log(err);
              return [false, err];
            },
          );
      }
      gapi.load('client', initiate);
    };
    getAccessToken();
  }
};

export const deleteEventGoogleCalendar = (task: any) => {
  function getAccessToken() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: calendarID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const accessToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token;

          getEvents(accessToken);
        });
    });
  }

  const removeEvent = async (events: any, accessToken: string) => {
    console.log(events);
    const eventId: string = events.filter(
      (event: any) => event.summary === task.title && event.id !== undefined,
    )[0]?.id;

    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response: any) => {
            return [true, response];
          },
          function (err: string) {
            console.log(err);
            return [false, err];
          },
        );
    }
    gapi.load('client', initiate);
  };

  const getEvents = (accessToken: string) => {
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
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then(
          (response: any) => {
            let events = response.result.items;
            removeEvent(events, accessToken);
          },
          function (err: string) {
            console.log(err);
            return [false, err];
          },
        );
    }
    gapi.load('client', initiate);
  };
  getAccessToken();
};
