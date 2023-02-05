import * as express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("signup", (req, res) => {
   const { nombre, email } = req.body;
});

app.listen(port, () => {
   console.log(port);
});
