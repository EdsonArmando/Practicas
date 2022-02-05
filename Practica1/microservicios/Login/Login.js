const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();
//Array Tipo
/*
0-------->Cliente
1-------->Restaurante
2-------->Repartidor
*/
//Array usuarios registrados en el sistema
const usuarios={"users":[
            {"id":1, "nombre":"Edson", "email":"edosn@gmail.com","rol":1, "pass" : "123"},            
            {"id":2, "nombre":"Armando", "email":"arma@gmail.com","rol":0, "pass" : "123"},
            {"id":3, "nombre":"luciana", "email":"lu@gmail.com","rol":2, "pass" : "123"},
            ]};


router.get("/api", async(req, res)=>{
	res.json({
		mensaje: "Funciona la app"
	});
});
router.post("/api/Login", async(req, res)=>{
	let bandera = false;
	let tipoUsuario = "";
	const usuario = {
		id: req.body.id,
		nombre: req.body.nombre,
		email: req.body.email,
		rol: req.body.rol,
		pass: req.body.pass
	}
	//Validar que usuario este en la base de datos
	for(let i = 0 ; i<usuarios.users.length; i++){
		if(usuarios.users[i].email === req.body.email && usuarios.users[i].pass === req.body.pass){
			bandera = true;
			usuario.id = usuarios.users[i].id;
			usuario.nombre = usuarios.users[i].nombre;
			usuario.email = usuarios.users[i].email;
			usuario.rol = usuarios.users[i].rol;
			usuario.pass = usuarios.users[i].pass;

			if(usuario.rol == 0){
				tipoUsuario = "Cliente";
				console
			}else if(usuario.rol == 1){
				tipoUsuario = "Restaurante";
			}else if(usuario.rol == 2){
				tipoUsuario = "Repartidor";
			}
		}
	}
	//si se encontro el usuario
	if(bandera){
		//Uso de jwt
		if (usuario.rol==0){
			jwt.sign({usuario},'llaveCliente',(err, token)=>{
				expiresIn: 1440
				res.json({
					mensaje: "bienvenido usuario tipo: " + tipoUsuario,
					token: token
				});
				console.log("UsuarioCorrecto");
				console.log("Token" + token);
			});
		}else  if (usuario.rol==1){
			jwt.sign({usuario},'llaveRestaurante',(err, token)=>{
				expiresIn: 1440
				res.json({
					mensaje: "bienvenido :) usuario tipo: " + tipoUsuario,
					token: token
				});
				console.log("UsuarioCorrecto");
				console.log("Token" + token);
			});
		}else if (usuario.rol==2){
			jwt.sign({usuario},'llaveRepartidor',(err, token)=>{
				expiresIn: 1440
				res.json({
					mensaje: "bienvenido usuario tipo: " + tipoUsuario,
					token: token
				});
			});
		}
		jwt.sign({usuario},'llaves',(err, token)=>{
			expiresIn: 1440			
			res.json({
				mensaje: "bienvenido usuario tipo: " + tipoUsuario,
				token: token
			});		
			console.log("UsuarioCorrecto");
			console.log("Token" + token);
		});
	}else{
		res.json({
			mensaje: "No se encontro el usuario",
			code: 403
		});
		console.log("Usuario Inorrecto");	
	}	
});
//Perimitiremos al usuario acceder a la ruta siempre que tenga el token
router.post("/api/testToken", VerificarToken, async(req, res)=>{	
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

// Authorization: Bearer <token>
function VerificarToken(req, res, next){	
	const beareheader = req.headers['authorization'];
	if(typeof beareheader !== 'undefined'){
		const token = beareheader.split(" ")[1];
		req.token = token;
		next();
	}else{		
		res.sendStatus(403);
	}
}
module.exports = router;