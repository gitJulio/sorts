const pg = require('../../configuracion/ps_connection')
const readline = require("readline");
var fs = require('fs');

exports.sorteosGet = async function(req, res, next) {

  var verificaSiguiente = 0;
  var numeroSiguiente = []
  var resultadosOrden;
  var arrayResultado
  resultadosOrden = 'a';
  var devuelveResultados = '';
  var devuelveResultadosSorteos = '';
  var tipo = [];
  var secuencia = []
  var contador = 0;
  var contadorPar = 0;
  var contadorImpar = 0;
  var ordenArray = [];

  var secuencia1 = 0;
  var secuencia2 = 0;
  var secuencia3 = 0;
  var secuencia4 = 0;
  var sorteos;
  var ver = [];

  sorteos =
    await pg.func('trach.get_sorteos_resultados', [req.body.anio, Number(req.body.ordenar)]).catch(err => {
      res.status(500).send({
        error: err,
        status: 500
      })
    })

  if (res.statusCode != 200) {
    return
  }


  function comparar(a, b) {
    return a - b;
  }

  sorteos.forEach(item => {
    arrayResultado = item.resultado.split("-").map(String);
    arrayResultado.sort(comparar);

    arrayResultado.forEach(item => {
      // console.log(item);
      contador++;

      if (verificaSiguiente != 0) {
        // console.log(item);
        numeroSiguiente.push(item)
        verificaSiguiente = 0;
      }

      if (item == req.body.contarC) {
        verificaSiguiente = item;
      }

      if (contador == 1) {
        devuelveResultadosSorteos = devuelveResultadosSorteos + item;
      } else {
        devuelveResultadosSorteos = devuelveResultadosSorteos + '-' + item;
      }

      if (item % 2 == 1) {
        contadorImpar++;
      } else {
        contadorPar++;
      }

      if (item < 9) {
        secuencia1++;
      }

      if (item > 9 && item < 20) {
        secuencia2++;
      }

      if (item > 19 && item < 30) {
        secuencia3++;
      }

      if (item > 29) {
        secuencia4++;
      }
    }) /*Fin foreach arrayResultado*/

    ver.push(devuelveResultadosSorteos)
    /******************TIPO**********/
    if (contadorPar > contadorImpar) {
      tipo.push("Par" + contadorPar)
    }

    if (contadorPar < contadorImpar) {
      tipo.push("Impar" + contadorImpar)
    }

    if (contadorPar == contadorImpar) {
      tipo.push("igual")
    }

    secuencia.push(secuencia1 + " - " + secuencia2 + " - " + secuencia3 + " - " + secuencia4)

    /***************FIN TIPO********/
    devuelveResultadosSorteos = '';
    contador = 0;
    contadorPar = 0;
    contadorImpar = 0;
    secuencia1 = 0;
    secuencia2 = 0;
    secuencia3 = 0;
    secuencia4 = 0;

  })

  /*Peticion
    localhost:7000/api/sorteosGet
    {
  	"opcion":4,
  	"contarC":2,
  	"ordenarSiguiente":0,
  	"anio":2002,
  	"ordenar":3
    }
  fin peticion*/
  if (req.body.opcion == 1) {
    if (req.body.ordenarSiguiente == 1) {
      res.send(ver.sort(comparar));
    } else {
      res.send(ver);
    }
  }
  if (req.body.opcion == 2) {
    res.send(tipo);
  }
  if (req.body.opcion == 3) {
    res.send(secuencia);
  }
  if (req.body.opcion == 4) {
    if (req.body.ordenarSiguiente == 1) {
      res.send({
        cantidad_jugadas: numeroSiguiente.length,
        numeros_siguientes: numeroSiguiente.sort(comparar)
      })
    } else {
      res.send({
        cantidad_jugadas: numeroSiguiente.length,
        numeros_siguientes: numeroSiguiente
      })
    }
  }
  if (req.body.opcion == 5) {
    res.send({
      sorteos
    })
  }




}