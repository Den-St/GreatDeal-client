import { getFunctions } from 'firebase/functions';
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBFppYzQD6dEQS_DmuJZlYXAJ8rF1dxtl8",
  authDomain: "greatdeal-4548d.firebaseapp.com",
  projectId: "greatdeal-4548d",
  storageBucket: "greatdeal-4548d.appspot.com",
  messagingSenderId: "634066359878",
  appId: "1:634066359878:web:542340d79b0ff20cad9c47"
};

const app = initializeApp(firebaseConfig);

export const googleAuthProvider = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
export const functions = getFunctions(app,'us-central1');