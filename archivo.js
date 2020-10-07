const fs_origen = require('fs')
const fs_destino = require('fs')

const parser = require("./parser")
const ordenador = require("./ordenador")

const path = ".//datos//wizmacro.DAT"

// ................................................................
// crear macros nuevas
// guardar macros ordenadas
// ................................................................

guardar = (path, cadena, sufijo) => {

  let nuevo_path = path

  nuevo_path =
    nuevo_path.slice(0, path.length - 4) +
    sufijo +
    nuevo_path.slice(path.length - 4)

  fs_destino.writeFile(nuevo_path, cadena, (err) => {
    if (err) console.log(err)
  });
}

// ................................................................
// acceso a macros originales
// obtener datos y clasificarlos
// ................................................................

leer = (path, cb) => {
  fs_origen.readFile(path, "utf-8", (err, datos) => {
    if (err) console.log(err)

    cb(datos)
  })
}

leer(path, (entrada) => {
  parser.procesar(entrada, (splits) => {
    ordenador.ordenar(splits, (macros_ord) => {
      guardar(path, macros_ord, "-proc")
    })
  })
})
