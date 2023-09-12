import { gapi } from 'gapi-script';
import { Todo } from '../redux/tasks/types';
import { isEqual } from 'date-fns';

const calendarID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

export const addEventGoogleCalendar = (task: Todo) => {
  if (task.reminder != '') {
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
            localStorage.setItem('access_token', accessToken);
            addPostGoggleCalendar();
            return accessToken;
          });
      });
    }

    const addPostGoggleCalendar = () => {
      const tokenStorage = localStorage.getItem('access_token');

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
            return [true, response];
          })
          .catch((err: any) => {
            if (err.status === 401) {
              getAccessToken();
            }
            console.log(err);
            return [false, err];
          });
      }
      gapi.load('client', initiate);
    };
    addPostGoggleCalendar();
  }
};

// Функция, которая инициализирует клиент Google API и возвращает промис
const initGoogleClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: apiKey,
          clientId: calendarID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.events',
        })
        .then(() => {
          resolve(gapi.client);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  });
};

// Функция, которая получает токен доступа к Google Календарю и возвращает промис
const getAccessToken = async () => {
  try {
    // Инициализируем клиент Google API
    const client = await initGoogleClient();
    // Аутентифицируем пользователя
    await client.auth2.getAuthInstance().signIn();
    // Получаем токен доступа

    const accessToken = client.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token;
    // Сохраняем токен в локальном хранилище
    localStorage.setItem('access_token', accessToken);
    // Возвращаем токен
    return accessToken;
  } catch (error) {
    // Обрабатываем ошибку
    console.error(error);
    throw error;
  }
};

// Функция, которая удаляет событие из Google Календаря по задаче и возвращает промис
export const deleteEventGoogleCalendar = async (task: any) => {
  try {
    // Получаем токен доступа из локального хранилища или запрашиваем новый
    const token = localStorage.getItem('access_token') || (await getAccessToken());
    // Инициализируем клиент Google API
    const client = await initGoogleClient();
    // Получаем список событий из Google Календаря
    const response = await client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    let events = response.result.items;
    // Находим событие, которое соответствует задаче по дате и названию
    const eventId: string = events.filter((event: any) => {
      const dateCalendar = new Date(event.start.dateTime);
      const dateTask = new Date(task.reminder);
      if (isEqual(dateCalendar, dateTask)) {
        return event.summary === task.title && event.id !== undefined;
      }
    })[0]?.id;
    // Удаляем событие из Google Календаря по его идентификатору
    await client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Event deleted');
  } catch (error) {
    // Обрабатываем ошибку
    console.error(error);
    throw error;
  }
};
