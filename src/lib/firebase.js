import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyBzEA5ovaepWXab3pvfr-ZIa9zKgGOmiow',
  authDomain: 'coinval-e60f1.firebaseapp.com',
  databaseURL: 'https://coinval-e60f1.firebaseio.com',
  projectId: 'coinval-e60f1',
  storageBucket: '',
  messagingSenderId: '644480516975',
});

export default app;

export const db = () => app.database();

export const ref = path => db().ref(path);
