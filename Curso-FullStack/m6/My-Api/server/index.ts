import * as express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("signup", (req, res) => {
   const { nombre, email } = req.body;
   res.json({
      id: "1234",
   });
});

app.listen(port, () => {
   console.log(port);
});
