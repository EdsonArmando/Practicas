const app = require('./app')

app.listen(app.get('port'));

console.log('Server Servicio on port', app.get('port'));