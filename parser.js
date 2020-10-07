/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr_orig : string,
  macros_arr_orden : string
}
*/

const EXP_PREG = /^\d\d\d\s/gm;

// ................................................................
// obtener datos y clasificarlos
// ................................................................

exports.clasificar = (entrada) => {

  const i = entrada.indexOf('000');
  let obj_macro = {
    encabezado: entrada.slice(0, i),
    macros_planas: entrada.slice(i + 4)
  }

  obj_macro.macros_arr_orig = obj_macro.macros_planas.split(EXP_PREG)
  return obj_macro
}

console.log("PARSER: modulo cargado");
