const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/apiRepartidor", async(req, res)=>{
	res.json({
		mensaje: "Funciona la app Repartidor"
	});
});

//Perimitiremos al usuario acceder a la ruta siempre que tenga el token
router.post("/api/PedidoDeRestaurante", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRepartidor', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				idPedido: 3,
				estadoPedidoRestaurante:"listo para la entrega" 		
			});
		}
	});
});
router.post("/api/EstadoPedido", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRepartidor', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				idPedido: 3,
				estado: "pedido en camino a entrega "			
			});
		}
	});
});
router.post("/api/Entregado", VerificarToken, async(req, res)=>{	
	//Verificar Token
	jwt.verify(req.token, 'llaveRepartidor', (error, authData)=>{
		if(error){
			console.log("Token Incorrecto");
			res.sendStatus(403);
		}else{	
			res.json({
				idPedido: 3,
				estado :"Entregado"
							
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