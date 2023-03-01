import * as express from "express";
import { baseDeDatos, rtdb } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const usersCollection = baseDeDatos.collection("/users");
const roomsCollection = baseDeDatos.collection("/rooms");

app.get("/env", (req, res) => {
   res.json({
      environment: process.env.ENV,
      back: process.env.BACKEND_URL,
   });
});

// CREA UN USER EN LA BASE DE DATOS

app.post("/auth", (req, res) => {
   const data = req.body;

   const newDocu = {
      name: data.gameState.name,
      score: data.score,
   };
   usersCollection
      .where("name", "==", data.gameState.name)
      .get()
      .then((snapShot) => {
         if (snapShot.empty) {
            usersCollection.add(newDocu).then((docu) => {
               return res.json({
                  userId: docu.id,
               });
            });
         } else {
            res.json({
               id: snapShot.docs[0].id,
            });
         }
      });
});

//CREA UN ROOM Y RTDB EN L BASE DE DATOS
app.post("/rooms", (req, res) => {
   const userId = req.body.userId;
   usersCollection
      .doc(userId.toString())
      .get()
      .then((doc) => {
         if (doc.exists) {
            const newDoc = {
               owner: userId,
               message: [],
            };
            const refrtdb = rtdb.ref("rooms/" + nanoid(6));
            refrtdb.set(newDoc).then(() => {
               const idRoom = refrtdb.key;
               const newIdRoom = 1000 + Math.floor(Math.random() * 999);
               roomsCollection
                  .doc(newIdRoom.toString())
                  .set({
                     rtdbRoomId: idRoom,
                  })
                  .then(() => {
                     return res.json({
                        id: newIdRoom.toString(),
                     });
                  });
            });
         } else {
            res.status(501).json({
               message: "Not Exist",
            });
         }
      });
});

//OBTENGO EL RTDB ID
app.get("/rooms/:id", (req, res) => {
   const { id } = req.params;
   roomsCollection
      .doc(id.toString())
      .get()
      .then((doc) => {
         if (doc.exists) {
            return res.json({
               rtdbRoom: doc.data().rtdbRoomId,
            });
         } else {
            res.json({
               message: "No Existe",
            });
         }
      });
});

//MANDO state A LA RTDB
app.post("/rooms/:rtdbId", (req, res) => {
   const { rtdbId } = req.params;
   const refrtdb = rtdb.ref("/rooms/" + rtdbId + "/data");

   const refif = rtdb.ref("/rooms");
   refif.get().then((snapshot) => {
      snapshot.forEach((doc) => {
         if (doc.key === rtdbId) {
            refrtdb.update(req.body).then(() => {
               return res.status(200).json({
                  message: "State Enviado",
               });
            });
         }
      });
   });
});

app.listen(port, () => {
   console.log("http://localhost:" + port);
});
