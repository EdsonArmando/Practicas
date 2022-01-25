const express = require("express");
const app = express();

//Routes
app.use(require('./Login.js'));


app.listen(3000,function(){
	console.log("server practica 1 SA");
});

module.exports = app;