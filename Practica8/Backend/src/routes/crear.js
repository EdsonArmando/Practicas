const { Router } = require('express');
const router = Router();
let cont = 0;
router.post('/AumentarContador',async(req, res) => {    
    res.json({
        contador: 1
    })
  
});

router.get('/getContador',async(req, res) => {    
    cont ++;
    res.json({
        contador: cont
    })
  
});

module.exports = router;