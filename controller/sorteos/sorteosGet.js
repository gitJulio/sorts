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
  var siguientes_compara = [];
  var anio = 0;

  var contarProximo = 0;
  var jugadasEntre = []

  var anioLista1 = []
  var anioLista2 = []

  var resultadoSiguiente = [];
  var contadorSiguiente = 0;
  sorteos =
    await pg.func('trach.get_sorteos_resultados', [req.body.anio, Number(req.body.ordenar), JSON.stringify(req.body.comparar_anios)]).catch(err => {
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

  var cuenta = 0;

  // console.log(req.body.comparar_anios.anio2);

  sorteos.forEach(item => {
    cuenta++;
    arrayResultado = item.resultado.split("-").map(String);
    arrayResultado.sort(comparar);

    arrayResultado.forEach(item2 => {
      contador++;
      if (verificaSiguiente != 0 && item.anio == req.body.comparar_anios.anio1) {
        anioLista1.push(item2)
        verificaSiguiente = 0;
      }

      if (verificaSiguiente != 0 && item.anio == req.body.comparar_anios.anio2) {
        anioLista2.push(item2)
        verificaSiguiente = 0;
      }

      if (item2 == req.body.contarC) {
        verificaSiguiente = item;
      }

      if (contador == 1) {
        devuelveResultadosSorteos = devuelveResultadosSorteos + item2;
      } else {
        devuelveResultadosSorteos = devuelveResultadosSorteos + '-' + item2;
      }

      if (item2 % 2 == 1) {
        contadorImpar++;
      } else {
        contadorPar++;
      }

      if (item2 < 9) {
        secuencia1++;
      }

      if (item2 > 9 && item < 20) {
        secuencia2++;
      }

      if (item2 > 19 && item < 30) {
        secuencia3++;
      }

      if (item2 > 29) {
        secuencia4++;
      }
    }) /*Fin foreach arrayResultado*/
    //


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
	"opcion":6,
	"contarC":1,
	"contarPoximo":"33",
	"jugada":1766,
	"ordenarSiguiente":1,
	"anio":2,
	"ordenar":1,
	"comparar_anios":{
		      "anio1":2019,
		      "anio2":0
	}
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
    if (req.body.ordenarSiguiente == 1) {
      res.send(tipo.sort(comparar));
    } else {
      res.send(tipo);
    }
  }
  if (req.body.opcion == 3) {
    res.send(secuencia);
  }
  if (req.body.opcion == 4) {
    if (req.body.ordenarSiguiente == 1) {
      res.send({
        cantidad_jugadas: anioLista1.length + anioLista2.length,
        numeros_siguientes: [{
            cantidad_anual: anioLista1.length,
            anio: req.body.comparar_anios.anio1,
            numeros: anioLista1.sort(comparar)
          },
          {
            cantidad_anual: anioLista2.length,
            anio: req.body.comparar_anios.anio2,
            numeros: anioLista2.sort(comparar)
          }
        ]
      })
    } else {
      res.send({
        cantidad_jugadas: anioLista1.length + anioLista2.length,
        numeros_siguientes: [{
            cantidad_anual: anioLista1.length,
            anio: req.body.comparar_anios.anio1,
            numeros: anioLista1
          },
          {
            cantidad_anual: anioLista2.length,
            anio: req.body.comparar_anios.anio2,
            numeros: anioLista2
          }
        ]
      })
    }
  }
  if (req.body.opcion == 5) {
    res.send({
      sorteos
    })
  }

  if (req.body.opcion == 6) {
    sorteos.forEach(item => {
      if (item.numero <= req.body.jugada) {
        // console.log(item.numero);
        contarProximo++;
        if ((item.resultado.includes(String(req.body.contarPoximo))) == true) {
          jugadasEntre.push((contarProximo - 1))
          contarProximo = 0;
        }
      }

    })

    console.log(jugadasEntre);
    res.send(jugadasEntre);
  }

  /*verifica que numero juega en el siguiente sorteo despues de un numero dado*/
  if (req.body.opcion == 7) {
    sorteos.forEach(item => {
      resultadoSiguiente = item.resultado.split("-").map(String);

    })
    res.send("a")
  }




}