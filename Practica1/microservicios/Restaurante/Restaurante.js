const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/apiRestaurante", async(req, res)=>{
	res.json({
		mensaje: "Funciona la app Restaurante"
	});
});

//Perimitiremos al usuario acceder a la ruta siempre que tenga el token
router.post("/api/RecibirPedido", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRestaurante', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				mensaje: "Token Correcto, Bienvenido al servicio de Restaurante",
				idPedido: 3,
				estadoPedido: "Recivido",
			});
		}
	});
});
router.post("/api/InformarEstado", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRestaurante', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				idPedido: 3,
				estadoPedido: "en proceso",
			});
		}
	});
});
router.post("/api/AvisarRepartido", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRestaurante', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				mensaje: "Token Correcto, Bienvenido al servicio de Restaurante",
				idPedido: 3,
				estadoPedido: "Pedido listo par entrega",
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