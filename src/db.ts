import { initializeApp } from "firebase/app";
import {
   getDatabase,
   ref,
   onValue,
   child,
   get,
   update,
} from "firebase/database";

let API_BASE_URL: "http://localhost:3000";
const firebaseConfig = {
   apiKey: "AIzaSyBMkdAV1xSFAx80CQqWqzaOi9njVJtgjIs",
   authDomain: "desafio-m6-6815b.firebaseapp.com",
   databaseURL: "https://desafio-m6-6815b-default-rtdb.firebaseio.com",
   projectId: "desafio-m6-6815b",
   storageBucket: "desafio-m6-6815b.appspot.com",
   messagingSenderId: "273566177017",
   appId: "1:273566177017:web:9560320e4538854e1bb428",
   measurementId: "G-0J2FP507JV",
};
const app = initializeApp(firebaseConfig);

export { API_BASE_URL, getDatabase, ref, onValue, app, child, get, update };
