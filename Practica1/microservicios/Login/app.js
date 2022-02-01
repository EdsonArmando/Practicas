const express = require("express");
const app = express();
var bodyParser = require('body-parser')

//Routes
app.use(require('./Login.js'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.listen(3001,function(){
	console.log("server practica 1 SA");
});

module.exports = app;