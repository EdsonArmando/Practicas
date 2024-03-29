const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/apiCliente", async(req, res)=>{
	res.json({
		mensaje: "Funciona la app Cliente"
	});
});

//Perimitiremos al usuario acceder a la ruta siempre que tenga el token
router.post("/api/testCliente", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveCliente', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				mensaje: "Token Correcto :), Bienvenido al servicio de cliente",
				idPedido: 3,
				estadoPedidoRestaurante: "En proceso",
				estadoPedidoRepartidor: "Entregando"			
			});
			console.log("Token correcto");
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
		console.log("Token Incorrecto");
	}
}
module.exports = router;