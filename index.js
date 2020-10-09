/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr_orig : string,
  macros_arr_orden : string
}
*/

const path = ".//datos//wizmacro2.DAT"

const archivo = require("./archivo");
const parser = require("./parser")
const ordenador = require("./ordenador")

archivo.leer(path, (entrada) => {

  /*
  del texto plano original, se obtienen 3 campos.
  - encabezado
  - las macros en texto plano (todo lo que hay despues del encabezado)
  - las macros en arreglo original
  */
  let obj_macro = parser.clasificar(entrada)

  /*
  toma las macros en arreglo original, y crea un nuevo arreglo
  ordenado segun el criterio de interes (ascendente segun valor unicode del nombre)
  */
  ordenador.ordenar(obj_macro)

  ordenador.recupReferencias(obj_macro)
  //ordenador.testResultados(obj_macro)

  ordenador.agregarPosicion(obj_macro)

  const salida = archivo.aTexto(obj_macro)
  archivo.guardar(path, salida, "-proc", (msg) => { console.log(msg) })
})
