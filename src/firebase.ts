import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth, Unsubscribe, User } from 'firebase/auth';

// Кэш для экземпляров Firebase
let cachedFirebaseApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;
let cachedAuth: Auth | null = null;

// Функция для динамической инициализации Firebase App
async function firebaseApp(): Promise<FirebaseApp> {
  if (!cachedFirebaseApp) {
    const { initializeApp } = await import(/* webpackChunkName: “firebase-app” */ 'firebase/app');
    cachedFirebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    });
  }
  return cachedFirebaseApp;
}

// Функция для получения экземпляра Firestore динамически
async function db(): Promise<Firestore> {
  if (!cachedDb) {
    const { getFirestore } = await import('firebase/firestore');
    const app = await firebaseApp();
    cachedDb = getFirestore(app);
  }
  return cachedDb;
}

// Функция для получения экземпляра Auth динамически
async function auth(): Promise<Auth> {
  if (!cachedAuth) {
    const { getAuth } = await import('firebase/auth');
    const app = await firebaseApp();
    cachedAuth = getAuth(app);
  }
  return cachedAuth;
}

// Функция для управления изменениями состояния авторизации
async function onAuthStateChanged(callback: (user: User | null) => void): Promise<Unsubscribe> {
  const authInstance = await auth();
  const { onAuthStateChanged } = await import('firebase/auth');
  return onAuthStateChanged(authInstance, callback);
}

// Экспорт функций
export { firebaseApp, db, auth, onAuthStateChanged };
