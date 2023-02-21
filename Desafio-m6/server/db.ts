import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase.json";

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as any),
   databaseURL: "https://desafio-m6-6815b-default-rtdb.firebaseio.com",
});

const baseDeDatos = admin.firestore();
const rtdb = admin.database();

export { baseDeDatos, rtdb };
