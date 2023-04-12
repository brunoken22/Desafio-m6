import { ref, onValue, app, getDatabase, child, get, update } from "./db";
const API_URL = "http://localhost:3000";
// "https://desafio-m6-nlba.onrender.com";
type jugada = "papel" | "tijera" | "piedra";
const state = {
   data: {
      gameState: {
         name: "",
         userId: "",
         roomId: "",
         rtdb: "",
         youConect: false,
         play: false,
         youSelect: "",
         opponentName: "",
         opponentPlay: false,
         opponentConect: false,
         opponentSelect: "",
      },
      winner: "",
      score: {
         you: 0,
         oponent: 0,
      },
   },
   nameTemp: "",
   listeners: () => {},
   async listenersRoom(idRtdb) {
      const db = getDatabase(app);
      const refRoom = ref(db, "rooms/" + idRtdb + "/data");
      onValue(refRoom, (snapshot) => {
         if (snapshot.exists()) {
            const newState = snapshot.val();
            this.setState(newState);
         }
      });
   },
   async obtenerGameState(rtdb) {
      const dbRef = ref(getDatabase());
      let newState = await get(child(dbRef, `rooms/${rtdb}/data`));

      if (newState.exists()) {
         const data = newState.val();
         this.setState(data);
      }
   },
   //Enviar datos para la rtdb
   async pushEstate(cb?) {
      const cs = await this.getState();

      await fetch(API_URL + "/rooms/" + cs.gameState.rtdb, {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(cs),
      });
      if (cb) {
         cb();
      }
   },

   async getState() {
      const cs = await this.data;
      return cs;
   },
   setState(newState) {
      this.data = newState;
      this.listeners();
   },
   async deleteSelect() {
      const cs = await state.getState();
      if (state.nameTemp === cs.gameState.name) {
         cs.gameState.play = false;
         cs.gameState.youSelect = "";
      } else {
         cs.gameState.opponentPlay = false;
         cs.gameState.opponentSelect = "";
      }
      await this.pushEstate();
   },
   //AGREGGA TU NOMBRE AL STATE
   async setName(name: string) {
      const { gameState } = await this.getState();
      gameState.name = name;
      gameState.youConect = true;
   },

   // crea un usuario en fireStore
   async signIn() {
      const cs = await this.getState();

      const newUser = await fetch(API_URL + "/auth", {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(cs),
      });

      const user = await newUser.json();

      const usrId = await user.id;
      cs.gameState.userId = usrId;
      this.setState(cs);
   },

   // crea un room en la rtdb para el owner de la sala

   async askNewRoom() {
      await this.signIn();
      const cs = await this.getState();

      const rawPublicRoomId = await fetch(`${API_URL}/rooms`, {
         method: "post",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(cs.gameState),
      });

      const pId = await rawPublicRoomId.json();
      const { id } = await pId;
      await this.getExistingRoomId(id);
      cs.gameState.roomId = id;
      this.setState(cs);
   },

   // obtiene el id de la rtdb y lo guarda en el state

   async getExistingRoomId(roomId: string) {
      const cs = await this.getState();
      const rawPrivateRoomId = await fetch(`${API_URL}/rooms/${roomId}`);
      const privateRoomIdParse = await rawPrivateRoomId.json();
      const rtdbRoomId = await privateRoomIdParse.rtdbRoom;
      cs.gameState.rtdb = rtdbRoomId;
      this.setState(cs);
   },

   whoWins(myPlay: jugada, computerPlay: jugada) {
      const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";
      const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
      const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
      const gane = [ganeConPapel, ganeConTijera, ganeConPiedra].includes(true);

      const computerGaneConTijera =
         computerPlay == "tijera" && myPlay == "papel";
      const computerGaneConPiedra =
         computerPlay == "piedra" && myPlay == "tijera";
      const computerGaneConPapel =
         computerPlay == "papel" && myPlay == "piedra";
      const computerGane = [
         computerGaneConTijera,
         computerGaneConPiedra,
         computerGaneConPapel,
      ].includes(true);

      if (gane === computerGane) {
         return "empate";
      } else if (gane) {
         return "true";
      } else if (computerGane) {
         return "false";
      }
   },

   async subscribe(cb) {
      this.listeners = cb;
      // console.log("El state a cambiado", this.data);
   },
};

export { state };
