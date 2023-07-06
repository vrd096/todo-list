import axios from 'axios';
import { gapi, loadAuth2, loadClientAuth2 } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Todo } from '../redux/tasks/types';

// const config = {
//   clientId: '1076102409898-2t7ucgvn5c14n27p269cg8jujd004tnl.apps.googleusercontent.com',
//   apiKey: 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ',
//   scope: 'https://www.googleapis.com/auth/calendar',
//   discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
// };

const calendarID = '1076102409898-2t7ucgvn5c14n27p269cg8jujd004tnl.apps.googleusercontent.com';
const apiKey = 'AIzaSyBthLDkbwkqXMUHVGr_ONl-MpOo8CEboQQ';

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
            // getEvents();
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
    // const getEvents = () => {
    //   function initiate() {
    //     gapi.client
    //       .init({
    //         apiKey: apiKey,
    //       })
    //       .then(function () {
    //         return gapi.client.request({
    //           path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    //         });
    //       })
    //       .then(
    //         (response: any) => {
    //           let events = response.result.items;
    //           return events;
    //         },
    //         function (err: string) {
    //           console.log(err);
    //           return [false, err];
    //         },
    //       );
    //   }
    //   gapi.load('client', initiate);
    // };
  }
};
