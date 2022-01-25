const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();



router.get("/api", async(req, res)=>{
	res.json({
		mensaje: "Funciona la app"
	});
});
router.post("/api/tokenUsuario", async(req, res)=>{
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
router.post("/api/Login", VerificarToken, async(req, res)=>{	
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
module.exports = router;