var express = require('express')
const bodyParser = require('body-parser');
const pg = require('./configuracion/ps_connection')
var app = express()
const readline = require("readline");

//***************cors*****************
var op = {
  origin: true,
  methods: ['POST', 'GET'],
  credentials: true,
  maxAge: 3600
}
var cors = require('cors')
//************************************

// parse application/json
app.use(bodyParser.json())

////Rutas
var sorteosRouter = require('./routes/sorteos-routes')

//********Ruta Principal
app.use('/api/', cors(op), sorteosRouter)

app.get('/', function(req, res) {
  res.send('Hello World')
})

// app.listen(3000)
app.listen(process.env.PORT, () => {
  console.log("Api Sorteo Analytic");
})