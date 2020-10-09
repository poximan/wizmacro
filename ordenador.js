/*
splits = {
  encabezado: string,
  macros_planas: string,
  macros_arr_orig : string,
  macros_arr_orden : string
}
*/

testMacros = (macros) => {

  let cont_program = 0
  let resumen = [0,0,0,0,0,0,0,0,0]

  // iterar las macros ordenadas
  macros.forEach(function(element, ind_macro_actual) {

    // para las macros de tipo programa
    if(/^P\s/.test(element)){

      cont_program++
      // tomar sus referencias a otras macros
      const ind_ini_ref = element.slice(element.lastIndexOf('   ') + 3, -2)
      const arr_refer = ind_ini_ref.split(',')

      //console.log("macro " + ind_macro_actual + " tiene " + arr_refer.length + " referencias" );
      resumen[arr_refer.length]++

      let ind_nuevos = ""

      // buscar el nombre de la macro referida
      for (const ind_orig of arr_refer) {

        // accede a la macro referida por indice, obtiene su nombre por regexp y elimina blancos
        const res = /\w\s(.*)<>/.exec(macros[ind_orig])

        if (res.length != 2) console.log("varias coincidencias para una misma expreg");
        if (res === null) console.log("no se encontro nombre para macro id " + ind_orig);

        const nombre = res[1].trim()

        // buscar la posicion actual de la macro ordenada, referida por el nombre
        const indice = macros.findIndex( macro => macro.includes(nombre) )
        if (indice == -1) console.log("no se encontro id para macro nombre " + nombre);

        ind_nuevos +=  indice + ","
      }
    }
  }, macros);
  console.log("se encontraron " + cont_program + " macros de tipo program");
  console.log(resumen);
}

exports.testResultados = (obj_macro) => {

  console.log("arr original");
  testMacros(obj_macro.macros_arr_orig)

  console.log("arr ordenado");
  testMacros(obj_macro.macros_arr_orden)
}

// ................................................................
// al reordenar las macros, en necesario buscar las viejas referencias
// a macros que se asumen cambiaron de posicion
// ................................................................

exports.recupReferencias = (obj_macro) => {

  // iterar las macros ordenadas
  obj_macro.macros_arr_orden.forEach(function(element, ind_macro_actual) {

    // para las macros de tipo programa
    if(/^P\s/.test(element)){

      // tomar sus referencias a otras macros
      const ind_ini_ref = element.slice(element.lastIndexOf('   ') + 3, -2)
      const arr_refer = ind_ini_ref.split(',')

      let ind_nuevos = ""

      // buscar el nombre de la macro referida
      for (const ind_orig of arr_refer) {

        // accede a la macro referida por indice, obtiene su nombre por regexp y elimina blancos
        const nombre = /\w\s(.*)<>/.exec(obj_macro.macros_arr_orig[ind_orig])[1].trim()
        //const nombre = /\d\d\d\s([APC])\s/.exec(obj_macro.macros_arr_orig[ind_orig])

        // buscar la posicion actual de la macro ordenada, referida por el nombre
        const indice = obj_macro.macros_arr_orden.findIndex( macro => macro.includes(" " + nombre + " ") )
        ind_nuevos +=  indice + ","
      }
      // reemplazar la lista de referencias vieja (arr_orig) por la nueva (arr_ord)
      this[ind_macro_actual] = element.replace(ind_ini_ref, ind_nuevos.slice(0, -1));
    }
  }, obj_macro.macros_arr_orden);
}

// ................................................................
// ordenar macros alfabeticamente mirando sus nombres
// ................................................................

exports.ordenar = (obj_macro) => {

  obj_macro.macros_arr_orden = obj_macro.macros_arr_orig.slice().sort((a, b) => {

    if ( a.substring([2]) > b.substring([2]) ) { return 1 }
    if ( a.substring([2]) < b.substring([2]) ) { return -1 }
    if ( a.substring([2]) === b.substring([2]) ) { return 0 }

    console.log("error ordenando macros")
    process.exit()
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
