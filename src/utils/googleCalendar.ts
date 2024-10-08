import { gapi } from 'gapi-script';
import { Todo } from '../redux/tasks/types';

const calendarID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const scope = 'https://www.googleapis.com/auth/calendar.events';

async function getAccessToken(): Promise<string> {
  const tokenStorage = localStorage.getItem('access_token');
  const expiryTime = localStorage.getItem('expiry_time');
  const now = new Date().getTime();

  if (tokenStorage && expiryTime && now < Number(expiryTime)) {
    return tokenStorage;
  }

  return new Promise<string>((resolve, reject) => {
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
              const authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
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
  });
}

async function initGapiClient(): Promise<void> {
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

async function ensureGapiClientAndToken(): Promise<string> {
  await initGapiClient();
  const tokenStorage = localStorage.getItem('access_token');
  if (!tokenStorage) {
    return getAccessToken();
  }
  return tokenStorage;
}

export const addEventGoogleCalendar = async (task: Todo): Promise<string> => {
  try {
    const accessToken = await ensureGapiClientAndToken();

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
      body: JSON.stringify(event),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.result.id;
  } catch (error: any) {
    if (error.status === 401) {
      await getAccessToken();
      return addEventGoogleCalendar(task);
    } else {
      console.error('Error adding event:', error);
      throw error;
    }
  }
};

export const deleteEventGoogleCalendar = async (task: Todo): Promise<string> => {
  try {
    const accessToken = await ensureGapiClientAndToken();
    const eventId = task.eventId;

    if (!eventId) {
      console.warn('Event ID not found, deletion not possible.');
      return '';
    }

    await gapi.client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return eventId;
  } catch (error: any) {
    if (error.status === 401) {
      await getAccessToken();
      return deleteEventGoogleCalendar(task);
    } else {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

export const updateEventGoogleCalendar = async (task: Todo): Promise<void> => {
  try {
    const accessToken = await ensureGapiClientAndToken();
    const eventId = task.eventId;

    if (!eventId) {
      console.warn('Event ID not found, update not possible.');
      return;
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

    await gapi.client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      method: 'PATCH',
      body: JSON.stringify(event),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error: any) {
    if (error.status === 401) {
      await getAccessToken();
      return updateEventGoogleCalendar(task);
    } else {
      console.error('Error updating event:', error);
      throw error;
    }
  }
};
