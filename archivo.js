/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr_orig : string,
  macros_arr_orden : string
}
*/

const fs_origen = require('fs')
const fs_destino = require('fs')

// ................................................................
// guardar macros ordenadas
// ................................................................

exports.guardar = (path, cadena, sufijo, cb) => {

  let nuevo_path = path

  nuevo_path =
    nuevo_path.slice(0, path.length - 4) +
    sufijo +
    nuevo_path.slice(path.length - 4)

  fs_destino.writeFile(nuevo_path, cadena, (err) => {
    if (err) console.log(err)
    cb()
  });
}

// ................................................................
// conversion a texto plano
// ................................................................

exports.aTexto = (obj_macro) => {
  return obj_macro.encabezado.toString() + obj_macro.macros_arr_orden.join('')
}

// ................................................................
// acceso a macros originales
// ................................................................

exports.leer = (path, cb) => {
  fs_origen.readFile(path, "utf-8", (err, datos) => {
    if (err) console.log(err)
    cb(datos)
  })
}

console.log("ARCHIVO: modulo cargado");
