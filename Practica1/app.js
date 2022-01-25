const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res)=>{
	res.json({
		mensaje: "Funciona la app"
	});
});
app.post("/api/login", (req, res)=>{
	const usuario = {
		id: 1,
		nombre: "Edson",
		email: "edosn@gmail.com"
	}
	//Uso de jwt
	jwt.sign({usuario},'llave',(err, token)=>{
		res.json({
			token: token
		});
	});
});
//Perimitiremos al usuario acceder a la ruta siempre que tenga el token
app.post("/api/posts", VerificarToken, (req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llave', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{
			res.json({
				mensaje: "Login correcto",
				authData
			});
		}
	});
});

app.listen(3000,function(){
	console.log("server practica 1 SA");
});
// Authorization: Bearer <token>
function VerificarToken(req, res, next){	
	console.log("Se usa esta funcion");
	const beareheader = req.headers['authorization'];
	if(typeof beareheader !== 'undefined'){
		const token = beareheader.split(" ")[1];
		req.token = token;
		next();
	}else{		
		res.sendStatus(403);
	}
}