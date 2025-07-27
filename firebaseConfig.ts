// firebaseConfig.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  push,
  update,
  Database,
  DatabaseReference
} from 'firebase/database';

const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
} = {
  apiKey: 'AIzaSyDjTYIxi76mcl2ZMBdUOiBQ_ogWFieMs40',
  authDomain: 'dyno-7acef.firebaseapp.com',
  databaseURL: 'https://dyno-7acef-default-rtdb.firebaseio.com',
  projectId: 'dyno-7acef',
  storageBucket: 'dyno-7acef.appspot.com',
  messagingSenderId: '596996410608',
  appId: '1:596996410608:web:991c160f49696927120635',
  measurementId: 'G-H4GVLPSC0T',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

// Export database instance and useful Firebase database functions
export { database, ref, set, get, onValue, push, update };
