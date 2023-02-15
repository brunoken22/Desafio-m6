"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.post("/singup", function (req, res) {
    var _a = req.body, nombre = _a.nombre, email = _a.email;
    res.json({
        message: "Se generó un ID",
        id: "1234"
    });
});
app.post("/auth", function (req, res) {
    var email = req.body.email.email;
    res.json({
        message: "Este es tu ID",
        id: "1234"
    });
});
app.post("/rooms", function (req, res) {
    var id = req.body.id.id;
    res.json({
        chatroom: [],
        idSala: "ds25a"
    });
});
app.get("/rooms/:idRoom", function (req, res) {
    var userId = req.query.userId;
    var body = req.body.body;
    res.json({
        message: "Obteniendo Id sala",
        idSala: "ds25a"
    });
});
app.listen(port, function () {
    console.log("http://localhost:" + port);
});
