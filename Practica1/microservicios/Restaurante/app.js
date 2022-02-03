const express = require("express");
const app = express();
const cors = require('cors');
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))

//Routes
app.use(require('./Restaurante.js'));

app.use(cors());
app.use(express.json({ limit: '100mb' }))

app.listen(3006,function(){
	console.log("server practica 1 SA en puerto 3006");
});

module.exports = app;