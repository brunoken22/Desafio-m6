import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE as string)),
  databaseURL: 'https://desafio-m6-6815b-default-rtdb.firebaseio.com',
});

const baseDeDatos = admin.firestore();
const rtdb = admin.database();

export {baseDeDatos, rtdb};
