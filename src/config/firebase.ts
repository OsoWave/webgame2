import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlCds0oN0SWAPeGgibFL1kTGz27K8saMY",
  authDomain: "webgame-180fa.firebaseapp.com",
  projectId: "webgame-180fa",
  storageBucket: "webgame-180fa.firebasestorage.app",
  messagingSenderId: "143135469015",
  appId: "1:143135469015:web:5e85e2d6da798e6a1aaf92"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);