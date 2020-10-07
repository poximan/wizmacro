/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr_orig : string,
  macros_arr_orden : string
}
*/

// ................................................................
// al reordenar las macros, en necesario buscar las viejas referencias
// a macros que se asumen cambiaron de posicion
// ................................................................

exports.recupReferencias = (obj_macro) => {

  obj_macro.macros_arr_orden.forEach(element => {

    // para las macros de programa
    if(/^P\s/.test(element)){

      const indices = element.slice(element.lastIndexOf('   ') + 3, -2).split(',')

      for (const indice of indices) {

        const nombre = /\w\s(.*)<>/.exec(obj_macro.macros_arr_orig[indice])[1].trim()
        const posicion = obj_macro.macros_arr_orden.findIndex(macro => macro.includes(nombre))

        console.log(nombre);
        console.log(posicion);

        if (posicion >= 0) {

        } else {
          console.log("error buscando nombre de macro");
        }
        console.log("\n");
      }
    }
  });
}

// ................................................................
// ordenar macros alfabeticamente mirando sus nombres
// ................................................................

exports.ordenar = (obj_macro) => {

  obj_macro.macros_arr_orden = obj_macro.macros_arr_orig.slice().sort((a, b) => {

    if ( a.substring([2]) > b.substring([2]) ) { return 1;  }
    if ( a.substring([2]) < b.substring([2]) ) { return -1; }
    return 0;
  });

  return obj_macro
}

exports.agregarPosicion = (obj_macro) => {

  obj_macro.macros_arr_orden.forEach(function(part, index) {
    this[index] = index.toString().padStart(3, "0") + " " +  this[index]
  }, obj_macro.macros_arr_orden); // segundo arg, referencia a si mismo

  return obj_macro
}

console.log("ORDENADOR: modulo cargado");
