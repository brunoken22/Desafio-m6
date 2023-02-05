import * as express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/singup", (req, res) => {
   const { nombre, email } = req.body;
   res.json({
      message: "Se generó un ID",
      id: "1234",
   });
});
app.post("/auth", (req, res) => {
   const { email } = req.body.email;
   res.json({
      message: "Este es tu ID",
      id: "1234",
   });
});
app.post("/rooms", (req, res) => {
   const { id } = req.body.id;
   res.json({
      chatroom: [],
      idSala: "ds25a",
   });
});
app.get("/rooms/:idRoom", (req, res) => {
   const { userId } = req.query;
   const { body } = req.body;
   res.json({
      message: "Obteniendo Id sala",
      idSala: "ds25a",
   });
});

app.listen(port, () => {
   console.log("http://localhost:" + port);
});
