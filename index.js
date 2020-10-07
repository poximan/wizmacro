const path = ".//datos//wizmacro0.DAT"

const archivo = require("./archivo");
const parser = require("./parser")
const ordenador = require("./ordenador")

archivo.leer(path, (entrada) => {

  let obj_macro = parser.clasificar(entrada)

  ordenador.ordenar(obj_macro)
  ordenador.agregarPosicion(obj_macro)

  const salida = archivo.aTexto(obj_macro)
  archivo.guardar(path, salida, "-proc", () => { console.log("proceso terminado");})
})
