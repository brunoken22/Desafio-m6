"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.get("/singup", function (req, res) {
    var _a = req.body, nombre = _a.nombre, email = _a.email;
    res.json({
        id: "1234"
    });
});
app.listen(port, function () {
    console.log("http://localhost:" + port);
});
