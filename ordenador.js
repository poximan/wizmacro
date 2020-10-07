/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr : string,
  macros_ord : string
}
*/

// ................................................................
// ordenar macros alfabeticamente mirando sus nombres
// ................................................................

exports.ordenar = (obj_macro) => {

  obj_macro.macros_ord = obj_macro.macros_arr.sort((a, b) => {

    if ( a.substring([2]) > b.substring([2]) ) { return 1;  }
    if ( a.substring([2]) < b.substring([2]) ) { return -1; }
    return 0;
  });

  return obj_macro
}

exports.agregarPosicion = (obj_macro) => {

  obj_macro.macros_ord.forEach(function(part, index) {
    this[index] = index.toString().padStart(3, "0") + " " +  this[index]
  }, obj_macro.macros_ord); // segundo arg, referencia a si mismo

  return obj_macro
}

console.log("ORDENADOR: modulo cargado");
