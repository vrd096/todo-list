import { gapi } from 'gapi-script';
import { Todo } from '../redux/tasks/types';
import { isEqual } from 'date-fns';

const calendarID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const scope = 'https://www.googleapis.com/auth/calendar.events';

function getAccessToken(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const tokenStorage = localStorage.getItem('access_token');
    const expiryTime = localStorage.getItem('expiry_time');
    const now = new Date().getTime();

    if (tokenStorage && expiryTime && now < Number(expiryTime)) {
      resolve(tokenStorage);
    } else {
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
                const authResponse = gapi.auth2
                  .getAuthInstance()
                  .currentUser.get()
                  .getAuthResponse();
                const accessToken = authResponse.access_token;
                const expiryTime = authResponse.expires_at;
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('expiry_time', expiryTime.toString());
                resolve(accessToken);
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  });
}

async function initGapiClient() {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client', () => {
      gapi.client
        .init({
          apiKey: apiKey,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  });
}

export const addEventGoogleCalendar = async (task: Todo): Promise<string> => {
  try {
    await initGapiClient(); // Инициализация клиента перед использованием

    const tokenStorage = localStorage.getItem('access_token');
    if (!tokenStorage) {
      await getAccessToken();
    }

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

    const response = await gapi.client.request({
      path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      method: 'POST',
      body: JSON.stringify(event), // Убедитесь, что body - это строка.
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    const eventId = response.result.id;
    // task.eventId = eventId;

    return eventId;
  } catch (error: any) {
    if (error.status === 401) {
      await getAccessToken();
      return addEventGoogleCalendar(task);
    } else {
      console.log(error);
      throw error;
    }
  }
};

export const deleteEventGoogleCalendar = async (task: Todo): Promise<void> => {
  try {
    await initGapiClient(); // Инициализация клиента перед использованием
    // console.log(task);
    const eventId = task.eventId;
    // if (!eventId) {
    //   console.log('Event ID не найден, удаление невозможно.');
    //   return;
    // }

    const tokenStorage = localStorage.getItem('access_token');
    if (!tokenStorage) {
      await getAccessToken();
    }

    const response = await gapi.client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    console.log(response.result.id);
    if (eventId == response.result.id) {
      console.log('есть совпадение по id');
    } else {
      console.log('Event ID не найден, удаление невозможно.');
    }

    console.log('Event deleted successfully:', response);
  } catch (error: any) {
    if (error.status === 401) {
      await getAccessToken();
      return deleteEventGoogleCalendar(task);
    } else {
      console.log(error);
      throw error;
    }
  }
};
